import { FC, useState, useEffect } from "react";
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

const categories = [
  { id: 1, title: "career + purpose" },
  { id: 2, title: "money + finances" },
  { id: 3, title: "growth + mindset" },
  { id: 4, title: "confidence + self-worth" },
  { id: 5, title: "health + wellness" },
  { id: 6, title: "friends + family + relationships" },
];

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [userInitial, setUserInitial] = useState<string>("U");
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Get full name from user metadata
          const fullName = user.user_metadata?.full_name || "";
          
          if (fullName) {
            // Extract first initial and set name
            const firstInitial = fullName.charAt(0).toUpperCase();
            
            setUserInitial(firstInitial);
            setUserName(fullName);
            
            console.log(`User initial set to: ${firstInitial}`);
          } else {
            console.log("No full name found in user metadata");
            // Fallback to a default value
            setUserInitial("U");
            setUserName("User");
          }
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

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
  };

  const handleEnter = () => {
    if (selectedNumber) {
      navigate("/focus-input", {
        state: { category: categories[selectedNumber - 1].id },
      });
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-[#221737] flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Top Section: Dropdown and Settings */}
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
              onClick={() => navigate("/delete-account")}
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
        onClick={() => navigate("/settings")}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-4xl xl:text-5xl font-arcade text-center text-white mb-4 sm:mb-6 [text-shadow:_0_0_20px_rgb(255_255_255_/_40%)]">
          choose your focus:
        </h1>

        <div className="space-y-1 sm:space-y-2 text-left mb-4 sm:mb-6 w-full max-w-md px-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-[#6AF0A0] transition-colors"
              onClick={() => handleNumberSelect(category.id)}
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

        {/* Spline Scene Container */}
        <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[480px]">
          <div className="relative w-full aspect-[4/4] sm:aspect-[5/4] md:aspect-[16/12]">
            <Spline
              scene="https://prod.spline.design/BN7JJD1FckQhdwfK/scene.splinecode"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCategoriesPage;
