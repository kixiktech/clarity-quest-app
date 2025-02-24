
import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VoiceTextInput from "@/components/VoiceTextInput";
import { useToast } from "@/components/ui/use-toast";

const FocusInputPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [focusText, setFocusText] = useState("");
  
  const category = location.state?.category || "session";

  const handleSubmit = (text: string) => {
    setFocusText(text);
    localStorage.setItem("sessionFocus", text);
    toast({
      title: "Focus Area Saved",
      description: "Your specific focus has been recorded. Let's begin the visualization.",
    });
  };

  const handleNavigation = () => {
    navigate("/category-processing", {
      state: {
        category,
        focus: focusText,
      }
    });
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#1A1F2C] flex flex-col p-4">
      <div className="flex-none">
        <Button
          onClick={() => navigate("/session-categories")}
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center gap-4 max-w-4xl mx-auto w-full pt-4">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-xl sm:text-2xl font-semibold text-primary leading-relaxed px-4">
            Anything specific you would like to focus on during this session?
          </h1>
          
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed px-4">
            Share any particular aspects, challenges, or goals you'd like to address in this visualization session.
          </p>

          <p className="text-xs sm:text-sm text-foreground/60 italic px-4">
            💡 Tip: Try using the voice recording feature! Simply speak naturally about what you'd like to focus on.
          </p>
        </div>

        <div className="w-full max-w-2xl px-4">
          <VoiceTextInput 
            onSubmit={handleSubmit}
            placeholder="Describe what you'd like to focus on during this session..."
          />
        </div>

        <div className="flex justify-center mt-2">
          <Button
            onClick={handleNavigation}
            className="gap-2 py-4 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-base relative overflow-hidden group
              hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
              before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
              after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
              after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
              hover:scale-105 active:scale-95"
          >
            {focusText ? "Begin Visualization" : "Skip"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusInputPage;
