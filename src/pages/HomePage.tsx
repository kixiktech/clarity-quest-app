
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D1D] to-[#0E0F25] -z-10" />
      
      <div className="absolute top-0 left-0 w-full h-full -z-5">
        <img 
          src="/lovable-uploads/c6d52c11-2653-458e-ac8d-0376e057da9c.png" 
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="text-center space-y-6 max-w-xl relative z-10">
        <img 
          src="/lovable-uploads/3d7b9f60-a195-43f0-b963-e6e084999749.png" 
          alt="ClarityQuest"
          className="mx-auto w-72 md:w-80"
        />
        
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-4 text-primary">
          VISUALIZE <span className="text-white">YOUR</span> FUTURE
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          Train your mind to manifest your goals through the power of scientific visualization
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center w-full">
          <Button
            onClick={() => navigate("/login?mode=signup")}
            className="px-8 py-6 text-lg bg-primary text-primary-foreground flex-1 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all"
          >
            Get Started
          </Button>
          
          <Button
            onClick={() => navigate("/science")}
            variant="outline"
            className="px-8 py-6 text-lg bg-transparent border-primary text-white flex-1 hover:bg-primary/10 transition-colors"
          >
            Learn The Science
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-6 flex justify-center w-full">
        <div className="flex gap-6 text-sm text-white/60">
          <a href="#" className="hover:text-white/90 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/90 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/90 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
