import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const IntroQuestionsPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const addCredits = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      if (user) {
        // Insert credits for the user
        const { error: creditError } = await supabase.from("session_credits").insert({
          user_id: user.id, // Using the user ID from the sign-up response
          credits_remaining: 2, // Adding 2 credits
          referral_credits: 0,
        });

        if (creditError) {
          console.error("Error inserting credits:", creditError);
          throw creditError;
        }

        toast({
          title: "Credits Added",
          description: "You have received 2 additional credits!",
        });
      }
    } catch (error) {
      console.error("Error adding credits:", error);
      toast({
        title: "Error",
        description: "Failed to add credits. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleButtonClick = async () => {

    navigate("/finances"); // Navigate to finances page
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#221737] flex flex-col items-center p-6 overflow-y-auto">
      <div className="max-w-2xl w-full space-y-8 text-center py-8 md:py-12">
        <div className="space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Welcome to Your Journey</h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            To create personalized visualization sessions tailored just for you, we'd like to understand your aspirations, goals, and dreams across different areas of your life.
          </p>

          <div className="space-y-6 md:space-y-8">
            <p className="text-lg text-foreground/70">
              We'll guide you through six important life categories:
            </p>
            
            <ul className="text-foreground/60 space-y-4">
              <li className="text-lg">💰 Money & Finances</li>
              <li className="text-lg">💼 Career & Purpose</li>
              <li className="text-lg">👥 Friends & Family</li>
              <li className="text-lg">🌱 Personal Growth & Mindset</li>
              <li className="text-lg">✨ Confidence & Self-Worth</li>
              <li className="text-lg">🌟 Health & Wellness</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-12 pb-8">
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
      
      {/* Background gradient elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />
      </div>
    </div>
  );
};

export default IntroQuestionsPage;
