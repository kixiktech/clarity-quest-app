
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const IntroQuestionsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">Welcome to Your Journey</h1>
        
        <p className="text-xl text-foreground/80 mb-8">
          To create personalized visualization sessions tailored just for you, we'd like to understand your aspirations, goals, and dreams across different areas of your life.
        </p>

        <div className="space-y-4">
          <p className="text-lg text-foreground/70">
            We'll guide you through six important life categories:
          </p>
          
          <ul className="text-foreground/60 space-y-2">
            <li>💰 Money & Finances</li>
            <li>💼 Career & Purpose</li>
            <li>👥 Friends & Family</li>
            <li>🌱 Personal Growth & Mindset</li>
            <li>✨ Confidence & Self-Worth</li>
            <li>🌟 Health & Wellness</li>
          </ul>
        </div>

        <Button
          onClick={() => navigate("/finances")}
          className="w-64 py-8 rounded-xl bg-primary text-primary-foreground font-medium text-lg relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
            before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
            after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
            after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
            hover:scale-105 active:scale-95"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          <span className="relative z-10">Let's Begin</span>
        </Button>
      </div>
    </div>
  );
};

export default IntroQuestionsPage;
