
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VoiceTextInput from "@/components/VoiceTextInput";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PersonalGrowthPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (text: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("user_responses").insert({
        user_id: user.id,
        category: "personal-growth",
        response: text
      });

      if (error) throw error;

      toast({
        title: "Response Saved",
        description: "Your personal growth goals have been recorded. Moving to the next category.",
      });
      navigate("/confidence");
    } catch (error) {
      console.error('Error saving response:', error);
      toast({
        title: "Error",
        description: "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#221737] flex flex-col p-4">
      <div className="flex-none">
        <Button
          onClick={() => navigate("/relationships")}
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="text-center space-y-6 max-w-2xl mx-auto mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary leading-relaxed">Personal Growth & Mindset</h1>
          
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            What areas of personal development are most important to you? Share your vision 
            for your mental, emotional, and spiritual growth, and how you want to evolve as a person.
          </p>

          <p className="text-sm text-foreground/60 italic">
            💡 Tip: Try using the voice recording feature! Simply speak about your goals naturally - it's often easier than typing.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto mb-6">
          <VoiceTextInput 
            onSubmit={handleSubmit}
            placeholder="Describe your personal growth goals and aspirations..."
          />
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

export default PersonalGrowthPage;
