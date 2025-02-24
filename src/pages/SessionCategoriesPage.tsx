
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, CreditCard, HelpCircle, LogOut, ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: 1, title: "career + purpose" },
  { id: 2, title: "money + finances" },
  { id: 3, title: "growth + mindset" },
  { id: 4, title: "confidence + self-worth" },
  { id: 5, title: "health + wellness" },
  { id: 6, title: "friends + family" }
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
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-4 left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                J
              </div>
              <span className="hidden sm:inline">John Doe</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#1A1F2E] border-[#2A2F3E] text-white">
            <DropdownMenuLabel className="text-white/60">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Subscription Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Contact Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-white/10 focus:bg-white/10 cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-400 hover:text-red-300 hover:bg-white/10 focus:bg-white/10 cursor-pointer"
              onClick={() => navigate("/delete-account")}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Account</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h1 className="text-5xl font-arcade text-center text-white mb-16 [text-shadow:_0_0_30px_rgb(255_255_255_/_40%)]">
        choose your focus:
      </h1>

      <div className="space-y-4 text-left mb-16">
        {categories.map((category, index) => (
          <div key={category.id} className="flex items-center gap-4">
            <span className="text-[#4ADE80] text-2xl font-arcade">{category.id}.</span>
            <span className="text-[#4ADE80] text-2xl font-arcade">{category.title}</span>
          </div>
        ))}
      </div>

      <div className="relative max-w-[300px] w-full">
        <div className="absolute inset-0 bg-[#4A4A4A] rounded-2xl transform translate-y-1"></div>
        <div className="relative bg-[#4A4A4A] rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <Button
                key={number}
                onClick={() => handleNumberSelect(number)}
                className={cn(
                  "h-16 w-full text-2xl font-bold bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white rounded-xl transition-all duration-300",
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
              "w-full h-16 text-2xl font-bold bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white rounded-xl transition-all duration-300",
              selectedNumber && "ring-2 ring-[#F97316] shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            )}
          >
            ENTER
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse shadow-[0_0_8px_#4ADE80] opacity-90"
              style={{
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionCategoriesPage;
