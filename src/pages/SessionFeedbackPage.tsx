import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Frown, Meh, Smile, X, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type FeedbackRating = "bad" | "good" | "great" | null;

const SessionFeedbackPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState<FeedbackRating>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSelect = (rating: FeedbackRating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    if (!selectedRating) {
      navigate("/session-categories");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("session_feedback")
        .insert({
          user_id: user.id,
          rating: selectedRating,
          session_category_id: location.state?.category || 1
        });

      if (error) throw error;

      toast({
        title: "Feedback Submitted",
        description: "Thank you for sharing your experience!",
      });
      
      navigate("/session-categories");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplay = () => {
    navigate("/visualization", { 
      state: {
        meditationContent: location.state?.meditationContent,
        categoryName: location.state?.categoryName,
        focusText: location.state?.focusText,
        audioContent: location.state?.audioContent
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />

      {/* Close Button */}
      <Button
        onClick={() => navigate("/session-categories")}
        variant="ghost"
        className="absolute top-4 right-4 text-white/60 hover:text-white/90 transition-colors"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center justify-between h-[100dvh] py-12 px-4">
        {/* Header Section */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mt-6">
          {/* Modified Pulsating Orb - Removed the selected div */}
          <div className="relative w-12 h-12 mb-6 sm:w-16 sm:h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-pulse-slow" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-xl animate-pulse-slow delay-100" />
            {/* The third div (selected element) has been removed */}
          </div>

          <h1 className="text-xl md:text-3xl font-semibold text-white mb-6 md:mb-8 tracking-tight text-center">
            How was your last session?
          </h1>

          {/* Rating Scale - Adjusted for better mobile display */}
          <div className="flex justify-center items-center gap-4 sm:gap-8 md:gap-12 mb-6">
            {[
              { rating: "bad", icon: Frown, color: "red" },
              { rating: "good", icon: Meh, color: "yellow" },
              { rating: "great", icon: Smile, color: "green" }
            ].map(({ rating, icon: Icon, color }) => (
              <div
                key={rating}
                onClick={() => handleRatingSelect(rating as FeedbackRating)}
                className="relative touch-manipulation cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleRatingSelect(rating as FeedbackRating);
                  }
                }}
              >
                <div className="p-2 sm:p-3 transition-all duration-300 hover:scale-110 active:scale-95">
                  <Icon
                    strokeWidth={1.75}
                    className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all duration-300 ${
                      selectedRating === rating
                        ? color === "red"
                          ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          : color === "yellow"
                          ? "text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                          : "text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Consistency Reminder - Adjusted width and text size */}
          <p className="text-white/70 text-xs sm:text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-xs text-center">
            Remember, visualization only works if you're consistent. Train your brain to align with your goals.
          </p>
        </div>

        {/* Action Buttons - Adjusted margins and padding */}
        <div className="flex flex-col gap-3 w-full max-w-xs mb-4 relative z-10">
          <Button
            onClick={handleReplay}
            className="w-full py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl
              transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className="w-5 h-5 mr-2" />
            Replay Session
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant={selectedRating ? "default" : "secondary"}
            className={`w-full py-4 sm:py-5 text-white font-medium rounded-xl
              transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer
              ${selectedRating 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 shadow-lg shadow-amber-500/30 animate-pulse-slow'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
              }`}
          >
            {isSubmitting ? "Submitting..." : (selectedRating ? "Submit & Finish" : "Skip & Finish")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionFeedbackPage;
