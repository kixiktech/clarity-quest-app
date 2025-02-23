
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VoiceTextInput from "@/components/VoiceTextInput";
import { useToast } from "@/components/ui/use-toast";

const HealthPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (text: string) => {
    toast({
      title: "All Responses Saved",
      description: "Thank you for sharing your goals! We'll now create personalized visualization sessions for you.",
    });
    navigate("/processing");
  };

  const handleButtonClick = () => {
    handleSubmit("");
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <Button
          onClick={() => navigate("/confidence")}
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-primary">Health & Wellness</h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            What does optimal health and well-being look like for you? Share your vision 
            for your physical health, energy levels, and overall wellness goals.
          </p>

          <div className="mt-8 flex justify-center">
            <VoiceTextInput 
              onSubmit={handleSubmit}
              placeholder="Describe your health goals and aspirations..."
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={handleButtonClick}
              className="gap-2 py-6 px-8 rounded-xl bg-primary text-primary-foreground font-medium text-lg relative overflow-hidden group
                hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
                before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
                after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
                after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
                hover:scale-105 active:scale-95"
            >
              Complete Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
