
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const VisualizationPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* End Session Button */}
      <Button
        onClick={() => navigate("/session-complete")}
        variant="ghost"
        className="absolute top-6 right-6 text-white/60 hover:text-white/90 transition-colors"
      >
        <X className="h-5 w-5 mr-2" />
        End
      </Button>

      {/* Top Text */}
      <p className="text-white/60 text-lg mb-12 animate-fade-in">
        Take a deep breath
      </p>

      {/* Pulsating Orb */}
      <div className="relative">
        {/* Multiple layers for depth effect */}
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-pulse-slow" />
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-xl animate-pulse-slow delay-100" />
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 opacity-40 blur-lg animate-pulse-slow delay-200" />
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-50 animate-pulse-slow delay-300" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-white to-indigo-100 opacity-20 scale-50 blur-xl animate-pulse-slow" />
      </div>

      {/* Bottom Text */}
      <p className="text-white/60 text-lg mt-12 animate-fade-in">
        Settle into the moment
      </p>

      {/* Ambient background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />
      </div>
    </div>
  );
};

export default VisualizationPage;
