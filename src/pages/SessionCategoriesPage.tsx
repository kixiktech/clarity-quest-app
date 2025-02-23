
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  { title: "Career + Purpose", route: "/career", color: "bg-[#3B82F6]" },
  { title: "Money + Finances", route: "/finances", color: "bg-[#4ADE80]" },
  { title: "Growth + Mindset", route: "/personal-growth", color: "bg-[#F43F5E]" },
  { title: "Confidence + Self-Worth", route: "/confidence", color: "bg-[#FFB800]" },
  { title: "Health + Wellness", route: "/health", color: "bg-[#F97316]" },
  { title: "Friends + Family", route: "/relationships", color: "bg-[#A78BFA]" }
];

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[700px] h-[700px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 relative z-10 
        [text-shadow:_0_0_30px_rgb(255_255_255_/_40%)] tracking-wide">
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
            {categories.map((category) => (
              <Button
                key={category.route}
                onClick={() => navigate(category.route)}
                className={`w-full h-16 ${category.color} rounded-xl text-lg font-medium tracking-wide
                  relative overflow-hidden transform transition-all duration-100
                  border-2 border-black/20 
                  shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.3)]
                  hover:brightness-110 hover:scale-[1.02] 
                  active:translate-y-1 active:shadow-none active:brightness-90
                  before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent
                  after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]`}
              >
                {category.title}
              </Button>
            ))}
          </div>

          {/* Green LED Lights */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse
                  shadow-[0_0_8px_#4ADE80] opacity-90"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCategoriesPage;
