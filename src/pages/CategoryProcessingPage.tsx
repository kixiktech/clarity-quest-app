
import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const messages = [
  "INITIALIZING YOUR VISUALIZATION...",
  "PROCESSING YOUR FOCUS AREAS...",
  "CREATING PERSONALIZED IMAGERY...",
  "GENERATING MINDFUL GUIDANCE...",
  "CRAFTING YOUR UNIQUE EXPERIENCE...",
  "PREPARING FOR YOUR JOURNEY..."
];

const CategoryProcessingPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 15000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      const messageIndex = Math.min(Math.floor(newProgress / 20), 5);
      setCurrentMessageIndex(messageIndex);

      if (newProgress >= 100) {
        clearInterval(timer);
        navigate("/visualization", {
          state: location.state
        });
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-2xl px-4">
        {/* Message */}
        <div className="mb-8 min-h-[2rem] text-center">
          <p className="text-[#39FF14] text-sm md:text-base pixel-font animate-fade-in">
            {messages[currentMessageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <Progress 
            value={progress} 
            className="mb-2"
          />
          <div className="text-right text-sm text-[#39FF14] pixel-font">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProcessingPage;
