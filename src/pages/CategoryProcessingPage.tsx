import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { generateMeditationResponse } from "@/integrations/openaiService";
import { generateSpeech } from "@/integrations/elevenLabsService";
import Spline from '@splinetool/react-spline';

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
  const [showCompletion, setShowCompletion] = useState(false);
  const [meditationResponse, setMeditationResponse] = useState<string | null>(null);

  useEffect(() => {
    const duration = 15000;
    const startTime = Date.now();

    const generateMeditation = async () => {
      console.log("\n🚀 Starting meditation generation process...");
      console.log("📋 Category:", location.state?.categoryName);
      console.log("🎯 Focus:", location.state?.focus);
      
      // Convert category name format (e.g., "career + purpose" to "career")
      const categoryKey = location.state?.categoryName ? 
        location.state.categoryName.split(' + ')[0].toLowerCase() : null;
      
      const result = await generateMeditationResponse(categoryKey);
      if (result.error) {
        console.error("❌ Meditation generation error:", result.error);
      } else {
        console.log("\n=== 🎭 OpenAI Generated Meditation ===");
        console.log(result.content);
        console.log("=====================================\n");
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

        // Test ElevenLabs API
        const testSpeech = async () => {
          console.log("Calling ElevenLabs API...");
          const audioBlob = await generateSpeech("Hi, How are you");
          
          if (audioBlob) {
            console.log("Audio generated successfully!", audioBlob);
            // Optional: Play the audio to test
            const audio = new Audio(URL.createObjectURL(audioBlob));
            audio.play();
          } else {
            console.error("Failed to generate audio");
          }
        };

        testSpeech();

        setTimeout(() => {
          console.log("Passing meditation to visualization:", meditationResponse);
          console.log("Passing category and focus:", location.state?.categoryName, location.state?.focus);
          navigate("/visualization", {
            state: { 
              meditationContent: meditationResponse || "No meditation data available",
              categoryName: location.state?.categoryName,
              focusText: location.state?.focus
            },
            replace: true
          });
        }, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen w-full bg-[#221737] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <img 
          src="/lovable-uploads/3d7b9f60-a195-43f0-b963-e6e084999749.png" 
          alt="ClarityQuest"
          className="w-48 md:w-56 opacity-30"
        />
      </div>

      {/* Spline Scene Container */}
      <div className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[600px] pt-6 pb-6">
        <div className="relative w-full aspect-[4/4] sm:aspect-[5/4] md:aspect-[16/12] overflow-hidden">
          <Spline
            scene="https://prod.spline.design/skZMG4xreB6TopXp/scene.splinecode"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Single Overlay with Radial Gradient */}
          <div
            className="absolute -inset-2 pointer-events-none"
            style={{
              background: "radial-gradient(circle, transparent 20%, #221737 80%)",
            }}
          />
        </div>
      </div>

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
