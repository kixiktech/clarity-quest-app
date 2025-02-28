
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, CreditCard, HelpCircle, LogOut, ChevronDown, Trash2 } from "lucide-react";
import Spline from '@splinetool/react-spline';
import { cn } from "@/lib/utils";

const categories = [
  { id: 1, title: "career + purpose" },
  { id: 2, title: "money + finances" },
  { id: 3, title: "growth + mindset" },
  { id: 4, title: "confidence + self-worth" },
  { id: 5, title: "health + wellness" },
  { id: 6, title: "friends + family + relationships" }
];

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
  };

  const handleEnter = () => {
    if (selectedNumber) {
      navigate("/focus-input", {
        state: {
          category: categories[selectedNumber - 1].id
        }
      });
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 sm:p-6 relative">
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                J
              </div>
              <span className="hidden sm:inline">John Doe</span>
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
        className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white/80 hover:text-white hover:bg-white/10"
        onClick={() => navigate("/settings")}
      >
        <Settings className="h-5 w-5" />
      </Button>

      <h1 className="text-3xl sm:text-5xl font-arcade text-center text-white mb-8 sm:mb-16 [text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]">
        choose your focus:
      </h1>

      <div className="space-y-2 sm:space-y-4 text-left mb-8 sm:mb-10 w-full max-w-md px-4">
        {categories.map((category, index) => (
          <div key={category.id} className="flex items-center gap-2 sm:gap-4">
            <span className="text-[#4ADE80] text-lg sm:text-2xl font-arcade">{category.id}.</span>
            <span className="text-[#4ADE80] text-lg sm:text-2xl font-arcade">{category.title}</span>
          </div>
        ))}
      </div>

      {/* Spline Scene Container */}
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="relative w-full h-[300px] sm:h-[300px] md:h-[300px]">
          <Spline
            scene="https://prod.spline.design/BN7JJD1FckQhdwfK/scene.splinecode" 
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
 {/*
      <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
        <div className="absolute inset-0 bg-[#4A4A4A] rounded-2xl transform translate-y-1"></div>
        <div className="relative bg-[#4A4A4A] rounded-2xl p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <Button
                key={number}
                onClick={() => handleNumberSelect(number)}
                className={cn(
                  "h-12 sm:h-16 w-full text-xl sm:text-2xl font-bold bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white rounded-lg sm:rounded-xl transition-all duration-300",
                  selectedNumber === number && "ring-2 ring-[#F97316] shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                )}
              >
                {number}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleEnter}
            disabled={!selectedNumber}
            className={cn(
              "w-full h-12 sm:h-16 text-xl sm:text-2xl font-bold bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white rounded-lg sm:rounded-xl transition-all duration-300",
              selectedNumber && "ring-2 ring-[#F97316] shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            )}
          >
            ENTER
          </Button>
        </div>

        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex gap-1.5 sm:gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#4ADE80] animate-pulse shadow-[0_0_8px_#4ADE80] opacity-90"
              style={{
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>
      </div>*/}
    </div>
  );
};

export default SessionCategoriesPage;
