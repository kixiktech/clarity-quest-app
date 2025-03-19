import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { generateMeditationResponse } from "@/integrations/openaiService";
import { generateSpeech } from "@/integrations/openaiSpeechService";
import Spline from '@splinetool/react-spline';
import { useToast } from "@/hooks/use-toast";
import { mapDisplayToDbCategory } from "@/utils/categoryMapping";

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
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [meditationResponse, setMeditationResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const duration = 15000;
    const startTime = Date.now();

    const generateMeditation = async () => {
      try {
        console.log("\n🚀 Starting meditation generation process...");
        console.log("📋 Category:", location.state?.categoryName);
        console.log("🎯 Focus:", location.state?.focus);
        
        if (!location.state?.categoryName) {
          throw new Error("No category selected");
        }

        // Map the display category to the database category
        const categoryKey = mapDisplayToDbCategory(location.state.categoryName);
        console.log("🔑 Using category key:", categoryKey);
        
        const result = await generateMeditationResponse(categoryKey);
        if (result.error) {
          console.error("❌ Meditation generation error:", result.error);
          setError(result.error);
          toast({
            title: "Error",
            description: "There was an issue generating your meditation. Please try again.",
            variant: "destructive",
          });
          setTimeout(() => navigate("/session-categories"), 3000);
          return;
        }

        console.log("\n=== 🎭 OpenAI Generated Meditation ===");
        console.log(result.content);
        console.log("=====================================\n");
        setMeditationResponse(result.content);

        // Generate audio using OpenAI's text-to-speech
        console.log("🎵 Generating meditation audio with OpenAI...");
        const audioBlob = await generateSpeech(result.content);
        
        if (audioBlob) {
          console.log("✨ Audio generated successfully!");
          // Convert blob to base64 for storage
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64Audio = reader.result;
            // Navigate with both text and audio content
            setTimeout(() => {
              navigate("/visualization", {
                state: { 
                  meditationContent: result.content,
                  categoryName: location.state?.categoryName,
                  focusText: location.state?.focus,
                  audioContent: base64Audio
                },
                replace: true
              });
            }, 2000);
          };
        } else {
          console.error("Failed to generate audio");
          toast({
            title: "Audio Generation Failed",
            description: "We'll proceed with text-only meditation.",
          });
          // Navigate with only text content if audio fails
          setTimeout(() => {
            navigate("/visualization", {
              state: { 
                meditationContent: result.content,
                categoryName: location.state?.categoryName,
                focusText: location.state?.focus
              },
              replace: true
            });
          }, 2000);
        }
      } catch (error) {
        console.error("Error in meditation generation:", error);
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
        toast({
          title: "Error",
          description: "There was an issue generating your meditation. Please try again.",
          variant: "destructive",
        });
        setTimeout(() => navigate("/session-categories"), 3000);
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
      }
    }, 50);

    return () => clearInterval(timer);
  }, [navigate, location.state, toast]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#221737] text-white">
        <h2 className="text-2xl font-semibold mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-300 mb-8">{error}</p>
        <p className="text-sm text-gray-400">Redirecting you back...</p>
      </div>
    );
  }

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
