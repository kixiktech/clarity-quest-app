
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const VisualizationPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative">
      {/* End Session Button */}
      <Button
        onClick={() => navigate("/session-feedback")}
        variant="ghost"
        className="absolute top-6 right-6 text-white/60 hover:text-white/90 transition-colors"
      >
        <X className="h-5 w-5 mr-2" />
        End
      </Button>

      {/* Top Text */}
      <p className="text-white/60 text-lg mb-12">
        Take a deep breath
      </p>

      {/* Pulsating Orb */}
      <div className="relative">
        {/* Multiple layers for depth effect */}
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-[pulse_3s_infinite]" />
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-xl animate-[pulse_3s_infinite_0.1s]" />
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 opacity-40 blur-lg animate-[pulse_3s_infinite_0.2s]" />
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-50 animate-[pulse_3s_infinite_0.3s]" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-white to-indigo-100 opacity-20 scale-50 blur-xl animate-[pulse_3s_infinite]" />
      </div>

      {/* Bottom Text */}
      <p className="text-white/60 text-lg mt-12">
        Settle into the moment
      </p>
    </div>
  );
};

export default VisualizationPage;
