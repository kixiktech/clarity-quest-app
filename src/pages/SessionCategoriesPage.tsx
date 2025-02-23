
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  { title: "Money & Finances", route: "/finances" },
  { title: "Career & Purpose", route: "/career" },
  { title: "Friends & Family", route: "/relationships" },
  { title: "Personal Growth & Mindset", route: "/personal-growth" },
  { title: "Confidence & Self-Worth", route: "/confidence" },
  { title: "Health & Wellness", route: "/health" }
];

const SessionCategoriesPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,13,46,0.5)_0%,transparent_100%)]" />
      
      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <img 
          src="/lovable-uploads/3d7b9f60-a195-43f0-b963-e6e084999749.png" 
          alt="ClarityQuest"
          className="w-48 md:w-56 opacity-30"
        />
      </div>

      <div className="max-w-xl w-full space-y-6 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Choose Your Session Category
        </h1>

        <div className="grid gap-4">
          {categories.map((category) => (
            <Button
              key={category.route}
              onClick={() => navigate(category.route)}
              className="w-full py-6 text-lg bg-black/30 hover:bg-black/40 border border-white/10 backdrop-blur-xl
                transform transition-all duration-300 hover:scale-[1.02]
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/10 before:to-primary/0 
                before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]"
            >
              {category.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionCategoriesPage;
