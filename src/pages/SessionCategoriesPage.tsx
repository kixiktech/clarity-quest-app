import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, CreditCard, HelpCircle, LogOut, ChevronDown } from "lucide-react";

const categories = [{
  title: "Career + Purpose",
  route: "/focus-input",
  color: "bg-[#3B82F6]",
  id: "career"
}, {
  title: "Money + Finances",
  route: "/focus-input",
  color: "bg-[#4ADE80]",
  id: "finances"
}, {
  title: "Growth + Mindset",
  route: "/focus-input",
  color: "bg-[#F43F5E]",
  id: "growth"
}, {
  title: "Confidence + Self-Worth",
  route: "/focus-input",
  color: "bg-[#FFB800]",
  id: "confidence"
}, {
  title: "Health + Wellness",
  route: "/focus-input",
  color: "bg-[#F97316]",
  id: "health"
}, {
  title: "Friends + Family",
  route: "/focus-input",
  color: "bg-[#A78BFA]",
  id: "relationships"
}];

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Profile Dropdown */}
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[700px] h-[700px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Title */}
      <h1 className="font-arcade md:text-5xl font-bold text-center text-white mb-16 mt-12 relative z-10 [text-shadow:_0_0_30px_rgb(255_255_255_/_40%)] tracking-wide text-xs">
        choose your focus:
      </h1>

      {/* 3D Keyboard Container */}
      <div className="relative max-w-md w-full mx-auto">
        {/* Keyboard Base - Creates 3D effect with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8E9196] to-[#403E43] rounded-3xl 
          transform translate-y-1 scale-[1.02] blur-sm opacity-50"></div>
        
        {/* Main Keyboard Body */}
        <div className="relative bg-gradient-to-br from-[#8E9196] to-[#403E43] rounded-3xl p-6 
          shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.3)]">
          
          {/* Orange Cable */}
          <div className="absolute -top-16 left-1/2 w-4 h-32 bg-[#FF9F1C] rounded-full 
            transform -translate-x-1/2 origin-bottom rotate-3
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"></div>

          {/* Button Grid */}
          <div className="grid gap-4">
            {categories.map(category => <Button key={category.id} onClick={() => navigate(category.route, {
            state: {
              category: category.id
            }
          })} className={`w-full h-16 ${category.color} rounded-xl text-lg font-medium tracking-wide
                  relative overflow-hidden transform transition-all duration-100
                  border-2 border-black/20 
                  shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.3)]
                  hover:brightness-110 hover:scale-[1.02] 
                  active:translate-y-1 active:shadow-none active:brightness-90
                  before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent
                  after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]`}>
                {category.title}
              </Button>)}
          </div>

          {/* Green LED Lights */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse
                  shadow-[0_0_8px_#4ADE80] opacity-90" style={{
            animationDelay: `${i * 200}ms`
          }} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default SessionCategoriesPage;
