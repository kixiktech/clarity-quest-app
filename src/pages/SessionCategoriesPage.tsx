import { FC, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, CreditCard, HelpCircle, LogOut, ChevronDown, Trash2, RefreshCw } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { format, addDays } from "date-fns";

const categories = [
  { id: 1, title: "career + purpose" },
  { id: 2, title: "money + finances" },
  { id: 3, title: "growth + mindset" },
  { id: 4, title: "confidence + self-worth" },
  { id: 5, title: "health + wellness" },
  { id: 6, title: "friends + family + relationships" },
];

const keyboardOverlayStyles = {
  position: 'absolute',
  inset: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  padding: '35px',
  pointerEvents: 'none',
} as const;

const keyButtonStyles = {
  position: 'relative',
  cursor: 'pointer',
  pointerEvents: 'auto',
  background: 'transparent',
  border: '2px solid transparent',
  borderRadius: '8px',
  transition: 'border-color 0.2s',
  '&:hover': {
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
} as const;

type State = {
  selectedCategory: number | null;
  spline: any;
  user: {
    initial: string;
    name: string;
  };
  sessions: {
    available: boolean;
  };
};

interface SplineInstance {
  emitEvent: (event: string, objectId: string) => void;
  // other methods/properties
}

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { triggerHaptic } = useHapticFeedback();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [spline, setSpline] = useState<SplineInstance | null>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const [userInitial, setUserInitial] = useState<string>("U");
  const [userName, setUserName] = useState<string>("User");
  const [hasAvailableSession, setHasAvailableSession] = useState<boolean>(true);
  const [nextResetDate, setNextResetDate] = useState<Date | null>(null);
  const isInitializedRef = useRef(false);

  const keyIds = {
    "2b6639a2-d5fc-4cfc-95ea-a054d3231441": "Key1",
    "dea3a446-3baa-43e9-bfa4-b4cfe46f17d4": "Key2",
    "73f9c0d2-aed9-47bf-bd6e-2f33171bef07": "Key3",
    "0e367520-0bcd-4dc1-aa7a-9f9448f4f971": "Key4",
    "f45d8eb8-88f6-4c33-a3f4-d1da742a9bd3": "Key5",
    "7d8ac785-5093-4216-ad74-41e449e13b56": "Key6",
    "66530cf3-5a25-4b74-af3a-799f0c29476d": "KeyEnter"
  };

  // Use all categories since no filtering condition is provided
  const filteredCategories = useMemo(() => categories, []);

  // Handle visibility changes to prevent unnecessary reloads
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Page became visible again, no need to reload
        console.log('Page visibility restored, preventing reload');
        
        // Re-focus the keyboard container if needed
        if (splineContainerRef.current) {
          splineContainerRef.current.focus();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Prevent multiple initialization on quick minimize/maximize
    if (isInitializedRef.current) {
      return;
    }

    const getUserData = async () => {
      try {
        isInitializedRef.current = true;
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error fetching user:", userError);
          throw userError;
        }

        if (user) {
          const fullName = user.user_metadata?.full_name || "";
          
          if (fullName) {
            const firstInitial = fullName.charAt(0).toUpperCase();
            setUserInitial(firstInitial);
            setUserName(fullName);
            console.log(`User initial set to: ${firstInitial}`);
          } else {
            console.log("No full name found in user metadata");
            setUserInitial("U");
            setUserName("User");
          }
          
          // Fetch and log credits as soon as the page loads
          await checkSessionAvailability(user.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Could not fetch user information",
          variant: "destructive",
        });
      }
    };

    getUserData();
  }, [toast]);

  const checkSessionAvailability = async (userId: string) => {
    try {
      // Use only columns that exist in the database
      const { data, error } = await supabase
        .from('session_credits')
        .select('credits_remaining, referral_credits, last_weekly_reset')
        .eq('user_id', userId)
        .single();

      if (error && error.code === 'PGRST116') { // No row found
        // Set initial reset date to 7 days from now
        const initialResetDate = addDays(new Date(), 7);
        
        // Store in localStorage for this user
        localStorage.setItem(`${userId}_next_reset_date`, initialResetDate.toISOString());
        
        const { error: insertError } = await supabase
          .from("session_credits")
          .insert({
            user_id: userId,
            credits_remaining: 2, // Initial credits
            referral_credits: 0,
            last_weekly_reset: new Date().toISOString()
          });

        if (insertError) {
          console.error("Error inserting initial credits:", insertError);
          throw insertError;
        }
        
        setHasAvailableSession(true);
        setNextResetDate(initialResetDate);
        console.log("Initial credits inserted: 2 remaining, next reset:", initialResetDate);
        return;
      }

      if (error) {
        console.error("Error checking session availability:", error);
        throw error;
      }

      // Get last reset date from database or localStorage
      const lastResetDate = data?.last_weekly_reset 
        ? new Date(data.last_weekly_reset) 
        : null;
      
      // Try to get saved next reset date from localStorage
      const savedNextResetDate = localStorage.getItem(`${userId}_next_reset_date`);
      let nextReset = savedNextResetDate ? new Date(savedNextResetDate) : null;
      
      // If no saved date but we have last reset, calculate next reset (7 days later)
      if (!nextReset && lastResetDate) {
        nextReset = addDays(lastResetDate, 7);
        localStorage.setItem(`${userId}_next_reset_date`, nextReset.toISOString());
      }
      
      // If we found a next reset date, set it in state
      if (nextReset) {
        setNextResetDate(nextReset);
      }
      
      const currentDate = new Date();
      
      // Check if we need to reset credits (if current date >= next reset date)
      if (nextReset && currentDate >= nextReset) {
        const newResetDate = new Date();
        const newNextResetDate = addDays(newResetDate, 7);
        
        // Store new next reset date in localStorage
        localStorage.setItem(`${userId}_next_reset_date`, newNextResetDate.toISOString());
        
        // Reset free credits and update last reset date
        const { error: resetError } = await supabase
          .from("session_credits")
          .update({ 
            credits_remaining: 2, // Reset to 2 free credits 
            last_weekly_reset: newResetDate.toISOString()
          })
          .eq("user_id", userId);
          
        if (resetError) {
          console.error("Error resetting credits:", resetError);
        } else {
          console.log("Credits reset successfully. Next reset:", newNextResetDate);
          setNextResetDate(newNextResetDate);
          setHasAvailableSession(true);
          return;
        }
      }
      
      // If no last reset date in DB, set it now
      if (!lastResetDate) {
        const newResetDate = new Date();
        const newNextResetDate = addDays(newResetDate, 7);
        
        // Store in localStorage
        localStorage.setItem(`${userId}_next_reset_date`, newNextResetDate.toISOString());
        
        await supabase
          .from("session_credits")
          .update({ 
            last_weekly_reset: newResetDate.toISOString()
          })
          .eq("user_id", userId);
          
        setNextResetDate(newNextResetDate);
      }

      const totalCredits = (data?.credits_remaining || 0) + (data?.referral_credits || 0);
      setHasAvailableSession(totalCredits > 0);
      
      console.log(`Current credits on page load: ${data?.credits_remaining} remaining, ${data?.referral_credits} referral, ${totalCredits} total`);
      console.log(`Next reset date: ${nextResetDate ? format(nextResetDate, 'MMM dd, yyyy') : 'unknown'}`);
    } catch (error) {
      console.error("Error in session availability check:", error);
      setHasAvailableSession(true); // Fallback to true to avoid blocking the user
    }
  };

  function onLoad(splineApp: any) {
    console.log("Spline scene loaded");
    setSpline(splineApp);
  }

  const handleKeyClick = useCallback((num: number) => {
    triggerHaptic();
    console.log(`Key ${num} clicked`);
    setSelectedNumber(num);
    
    const keyUUID = Object.entries(keyIds).find(([_, value]) => value === `Key${num}`)?.[0];
    if (keyUUID && spline) {
      spline.emitEvent('mouseDown', keyUUID);
    }
  }, [triggerHaptic, spline, setSelectedNumber]);

  const handleEnterClick = async () => {
    triggerHaptic();
    
    if (!hasAvailableSession) {
      navigate("/paywall");
      return;
    }

    if (!selectedNumber) return;

    console.log("Enter pressed");

    const enterKeyUUID = Object.entries(keyIds).find(([_, value]) => value === 'KeyEnter')?.[0];
    if (enterKeyUUID && spline) {
      spline.emitEvent('mouseDown', enterKeyUUID);
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const { data: creditsData, error: fetchError } = await supabase
        .from("session_credits")
        .select("credits_remaining")
        .eq("user_id", user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching credits:", fetchError);
        throw fetchError;
      }

      const currentCredits = creditsData?.credits_remaining || 0;
      
      // Get next reset date from localStorage
      const savedNextResetDate = localStorage.getItem(`${user.id}_next_reset_date`);
      if (savedNextResetDate) {
        setNextResetDate(new Date(savedNextResetDate));
      }

      if (currentCredits <= 0) {
        setHasAvailableSession(false);
        navigate("/paywall");
        return;
      }

      const { error: updateError } = await supabase
        .from("session_credits")
        .update({ credits_remaining: currentCredits - 1 })
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Error updating credits:", updateError);
        throw updateError;
      }

      console.log(`Credits updated: ${currentCredits - 1} remaining`);

      setHasAvailableSession(currentCredits - 1 > 0);

      setTimeout(() => {
        navigate("/focus-input", {
          state: { 
            category: categories[selectedNumber - 1].id,
            categoryName: categories[selectedNumber - 1].title
          },
        });
      }, 500);
    } catch (error) {
      console.error("Error handling enter click:", error);
      toast({
        title: "Error",
        description: "Failed to process session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    triggerHaptic();
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Could not sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const container = splineContainerRef.current;
    if (container) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key >= "1" && event.key <= "6") {
          const num = parseInt(event.key);
          triggerHaptic();
          handleKeyClick(num);
        } else if (event.key === "Enter") {
          triggerHaptic();
          handleEnterClick();
        }
      };

      container.addEventListener("keydown", handleKeyDown);
      container.setAttribute("tabindex", "0");
      container.focus();

      return () => container.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedNumber, handleKeyClick, handleEnterClick, triggerHaptic]);

  return (
    <div className="h-screen w-full bg-[#221737] flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-2 sm:top-4 xl:top-6 left-2 sm:left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                {userInitial}
              </div>
              <span className="hidden sm:inline text-sm">{userName}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 sm:w-56 bg-[#1A1F2E] border-[#2A2F3E] text-white">
            <DropdownMenuLabel className="text-white/60 text-sm">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer text-sm">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Subscription Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer text-sm">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Contact Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-white/10 focus:bg-white/10 cursor-pointer text-sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400 hover:text-red-300 hover:bg-white/10 focus:bg-white/10 cursor-pointer text-sm"
              onClick={() => {
                triggerHaptic();
                navigate("/delete-account");
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Account</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button
        variant="ghost"
        className="absolute top-2 sm:top-4 xl:top-6 right-2 sm:right-4 text-white/80 hover:text-white hover:bg-white/10"
        onClick={() => {
          triggerHaptic();
          navigate("/settings");
        }}
      >
        <Settings className="h-5 w-5" />
      </Button>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-4xl xl:text-5xl font-arcade text-center text-white mb-4 sm:mb-6 [text-shadow:_0_0_20px_rgb(255_255_255_/_40%)]">
          choose your focus:
        </h1>

        <div className="space-y-1 sm:space-y-2 text-left mb-4 sm:mb-6 w-full max-w-md px-4">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-[#FFD700] transition-colors"
              onClick={() => setSelectedNumber(category.id)}
            >
              <span 
                className={`text-base sm:text-xl font-arcade transition-all duration-300 ${
                  selectedNumber === null 
                    ? "text-[#4ADE80]" 
                    : selectedNumber === category.id
                      ? "text-[#FFD700] [text-shadow:_0_0_10px_#FFD700,_0_0_20px_#B8860B] scale-105" 
                      : "text-gray-400"
                }`}
              >
                {category.id}.
              </span>
              <span 
                className={`text-base sm:text-xl font-arcade transition-all duration-300 ${
                  selectedNumber === null 
                    ? "text-[#4ADE80]" 
                    : selectedNumber === category.id
                      ? "text-[#FFD700] [text-shadow:_0_0_10px_#FFD700,_0_0_20px_#B8860B] scale-105" 
                      : "text-gray-400"
                }`}
              >
                {category.title}
              </span>
            </div>
          ))}
        </div>

        {!hasAvailableSession && nextResetDate && (
          <div className="text-center mb-4">
            <p className="text-amber-400 text-sm mb-1">
              You've used your free session this week
            </p>
            <p className="text-white/70 text-xs flex items-center justify-center gap-1">
              <RefreshCw className="h-3 w-3" />
              <span>Credits reset on {format(nextResetDate, 'MMMM dd, yyyy')}</span>
            </p>
          </div>
        )}

        <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[480px]">
          <div className="relative w-full aspect-[4/4] sm:aspect-[5/4] md:aspect-[16/12]">
            <Spline
              scene="https://prod.spline.design/BN7JJD1FckQhdwfK/scene.splinecode"
              onLoad={onLoad}
              className="absolute inset-0 w-full h-full"
            />
            
            <div style={keyboardOverlayStyles}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  style={keyButtonStyles}
                  onClick={() => handleKeyClick(num)}
                  className={`${
                    selectedNumber === num ? 'border-[#4ADE80] border-opacity-50' : ''
                  }`}
                >
                  <span className="sr-only">Key {num}</span>
                </button>
              ))}
              
              <button
                style={{
                  ...keyButtonStyles,
                  gridColumn: '1 / -1',
                  marginTop: '1px',
                }}
                onClick={handleEnterClick}
                disabled={!selectedNumber}
              >
                <span className="sr-only">Enter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCategoriesPage;