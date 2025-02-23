
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const messages = [
  "Initializing your unique journey...",
  "Gathering insights from your responses...",
  "Analyzing your aspirations...",
  "Crafting your personalized visualization...",
  "Fine-tuning your session details...",
  "Finalizing your custom session categories…"
];

const ProcessingPage: FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const duration = 35000; // 35 seconds
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
        setShowCompletion(true);
        setTimeout(() => {
          navigate("/session-categories");
        }, 2000); // Wait 2 seconds before transitioning
      }
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(timer);
  }, [navigate]);

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

      {showCompletion ? (
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Congratulations!
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            Your custom session categories are complete!
          </p>
        </div>
      ) : (
        <>
          {/* Glowing Orb */}
          <div className="relative mb-12">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 opacity-20 blur-2xl animate-pulse" />
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-40 blur-xl animate-pulse delay-150" />
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-60 blur-lg animate-pulse delay-300" />
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 opacity-80 animate-pulse delay-500" />
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
        </>
      )}
    </div>
  );
};

export default ProcessingPage;
