
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Spline from '@splinetool/react-spline';

const VisualizationPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#221737] flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
      <p className="text-white/60 text-lg mb-1 animate-fade-in">
        Take a deep breath
      </p>

      {/* Spline Scene Container */}
      <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[480px]">
        <div className="relative w-full aspect-[4/4] sm:aspect-[5/4] md:aspect-[16/12]">
          <Spline
            scene="https://prod.spline.design/aolWtgmIui-99n5Q/scene.splinecode"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* Bottom Text */}
      <p className="text-white/60 text-lg mt-1 animate-fade-in">
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
