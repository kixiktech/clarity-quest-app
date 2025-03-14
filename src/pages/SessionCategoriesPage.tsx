import { FC, useState, useEffect, useRef } from "react";
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
import { Settings, CreditCard, HelpCircle, LogOut, ChevronDown, Trash2 } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

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

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { triggerHaptic } = useHapticFeedback();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [spline, setSpline] = useState<any>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const [userInitial, setUserInitial] = useState<string>("U");
  const [userName, setUserName] = useState<string>("User");
  const [hasAvailableSession, setHasAvailableSession] = useState<boolean>(true);

  const keyIds = {
    "2b6639a2-d5fc-4cfc-95ea-a054d3231441": "Key1",
    "dea3a446-3baa-43e9-bfa4-b4cfe46f17d4": "Key2",
    "73f9c0d2-aed9-47bf-bd6e-2f33171bef07": "Key3",
    "0e367520-0bcd-4dc1-aa7a-9f9448f4f971": "Key4",
    "f45d8eb8-88f6-4c33-a3f4-d1da742a9bd3": "Key5",
    "7d8ac785-5093-4216-ad74-41e449e13b56": "Key6",
    "66530cf3-5a25-4b74-af3a-799f0c29476d": "KeyEnter"
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
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
      const { data, error } = await supabase
        .from('session_credits')
        .select('credits_remaining, referral_credits')
        .eq('user_id', userId)
        .single();

      if (error && error.code === 'PGRST116') { // No row found
        const { error: insertError } = await supabase
          .from("session_credits")
          .insert({
            user_id: userId,
            credits_remaining: 2, // Initial credits
            referral_credits: 0,
          });

        if (insertError) {
          console.error("Error inserting initial credits:", insertError);
          throw insertError;
        }
        setHasAvailableSession(true);
        console.log("Initial credits inserted: 2 remaining");
        return;
      }

      if (error) {
        console.error("Error checking session availability:", error);
        throw error;
      }

      const totalCredits = (data?.credits_remaining || 0) + (data?.referral_credits || 0);
      setHasAvailableSession(totalCredits > 0);
      console.log(`Current credits on page load: ${data?.credits_remaining} remaining, ${data?.referral_credits} referral, ${totalCredits} total`);
    } catch (error) {
      console.error("Error in session availability check:", error);
      setHasAvailableSession(true); // Fallback to true to avoid blocking the user
    }
  };

  function onLoad(splineApp: any) {
    console.log("Spline scene loaded");
    setSpline(splineApp);
  }

  const handleKeyClick = (num: number) => {
    triggerHaptic();
    console.log(`Key ${num} clicked`);
    setSelectedNumber(num);
    
    const keyUUID = Object.entries(keyIds).find(([_, value]) => value === `Key${num}`)?.[0];
    if (keyUUID && spline) {
      spline.emitEvent('mouseDown', keyUUID);
    }
  };

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
          handleKeyClick(num);
        } else if (event.key === "Enter") {
          handleEnterClick();
        }
      };

      container.addEventListener("keydown", handleKeyDown);
      container.setAttribute("tabindex", "0");
      container.focus();

      return () => container.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedNumber]);

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
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-[#6AF0A0] transition-colors"
              onClick={() => setSelectedNumber(category.id)}
            >
              <span className={`text-[#4ADE80] text-base sm:text-xl font-arcade ${selectedNumber === category.id ? "text-[#6AF0A0]" : ""}`}>
                {category.id}.
              </span>
              <span className={`text-[#4ADE80] text-base sm:text-xl font-arcade ${selectedNumber === category.id ? "text-[#6AF0A0]" : ""}`}>
                {category.title}
              </span>
            </div>
          ))}
        </div>

        {!hasAvailableSession && (
          <p className="text-amber-400 text-sm text-center mb-2">
            You've used your free session this week
          </p>
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