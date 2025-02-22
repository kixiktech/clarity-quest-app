
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VoiceTextInput from "@/components/VoiceTextInput";
import { useToast } from "@/components/ui/use-toast";

const FinancesPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (text: string) => {
    toast({
      title: "Response Saved",
      description: "Your financial goals have been recorded. Let's move on to the next category.",
    });
    navigate("/career");
  };

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col p-4">
      <div className="flex-none">
        <Button
          onClick={() => navigate("/intro-questions")}
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-4 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Money & Finances</h1>
          
          <p className="text-base sm:text-lg text-foreground/80">
            Share your financial aspirations and goals. What does financial freedom mean to you? 
            Describe your ideal financial situation and the lifestyle you want to achieve.
          </p>
        </div>

        <div className="w-full">
          <VoiceTextInput 
            onSubmit={handleSubmit}
            placeholder="Describe your financial goals and aspirations..."
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => navigate("/career")}
            className="gap-2 py-4 px-6 rounded-xl bg-primary text-primary-foreground font-medium text-base sm:text-lg relative overflow-hidden group
              hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
              before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
              after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
              after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
              hover:scale-105 active:scale-95"
          >
            Next Category
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinancesPage;
