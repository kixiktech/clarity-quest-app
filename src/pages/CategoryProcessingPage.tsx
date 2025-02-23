
import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const messages = [
  "Initializing your visualization...",
  "Processing your focus areas...",
  "Creating personalized imagery...",
  "Generating mindful guidance...",
  "Crafting your unique experience...",
  "Preparing for your journey..."
];

const CategoryProcessingPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 15000; // 15 seconds for category processing
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      // Update message based on progress
      const messageIndex = Math.min(Math.floor(newProgress / 20), 5);
      setCurrentMessageIndex(messageIndex);

      if (newProgress >= 100) {
        clearInterval(timer);
        // Navigate to visualization with the category and focus data
        navigate("/visualization", {
          state: location.state
        });
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,13,46,0.5)_0%,transparent_100%)]" />

      {/* Glowing Orb */}
      <div className="relative mb-12">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-400 to-purple-300 opacity-20 blur-2xl animate-pulse" />
        <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 opacity-40 blur-xl animate-pulse delay-150" />
        <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-600 to-purple-500 opacity-60 blur-lg animate-pulse delay-300" />
        <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-400 to-purple-300 opacity-80 animate-pulse delay-500" />
      </div>

      {/* Message */}
      <div className="mb-8 min-h-[2rem] text-center">
        <p className="text-white/80 text-lg md:text-xl animate-fade-in">
          {messages[currentMessageIndex]}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <Progress 
          value={progress} 
          className="h-2 bg-white/10"
        />
        <div className="mt-2 text-right text-sm text-white/60">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default CategoryProcessingPage;
