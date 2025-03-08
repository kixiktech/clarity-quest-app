import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { generateMeditationResponse } from "@/integrations/openaiService";

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
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [meditationResponse, setMeditationResponse] = useState<string | null>(null);

  useEffect(() => {
    const duration = 15000;
    const startTime = Date.now();

    const generateMeditation = async () => {
      console.log("Generating meditation...");
      const result = await generateMeditationResponse();
      if (result.error) {
        console.error("Meditation generation error:", result.error);
      } else {
        console.log("Meditation generated successfully:", result.content);
        setMeditationResponse(result.content);
      }
    };

    generateMeditation();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      const messageIndex = Math.min(Math.floor(newProgress / 20), 5);
      setCurrentMessageIndex(messageIndex);

      if (newProgress >= 100) {
        clearInterval(timer);
        setShowCompletion(true);

        setTimeout(() => {
          console.log("Passing meditation to visualization:", meditationResponse);
          navigate("/visualization", {
            state: { meditationContent: meditationResponse || "No meditation data available" },
            replace: true
          });
        }, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-2xl px-4">
        {/* Message */}
        <div className="mb-8 min-h-[2rem] text-center">
          <p className="text-[#FFD700] text-sm md:text-base pixel-font animate-fade-in">
            {messages[currentMessageIndex]}
          </p>
        </div>

        {showCompletion ? (
          <div className="text-center animate-fade-in pixel-font">
            <h2 className="text-xl md:text-2xl font-normal text-[#FFD700] mb-4">
              PREPARATION COMPLETE
            </h2>
            <p className="text-sm md:text-base text-[#FFD700]">
              ENTERING VISUALIZATION...
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto">
            <Progress 
              value={progress} 
              className="mb-2"
            />
            <div className="text-right text-sm text-[#FFD700] pixel-font">
              {Math.round(progress)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProcessingPage;
