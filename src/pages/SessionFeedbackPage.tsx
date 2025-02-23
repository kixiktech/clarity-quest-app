
import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Frown, Meh, Smile, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FeedbackRating = "bad" | "good" | "great" | null;

const SessionFeedbackPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState<FeedbackRating>(null);

  const handleRatingSelect = (rating: FeedbackRating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for sharing your experience!",
      });
    }
    navigate("/session-categories");
  };

  const handleReplay = () => {
    navigate("/visualization", { state: location.state });
  };

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />

      {/* Close Button */}
      <Button
        onClick={() => navigate("/session-categories")}
        variant="ghost"
        className="absolute top-6 right-6 text-white/60 hover:text-white/90 transition-colors"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Main Content */}
      <div className="max-w-2xl w-full mx-auto text-center z-10">
        {/* Central Pulsating Orb */}
        <div className="relative w-24 h-24 mx-auto mb-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-xl animate-pulse-slow delay-100" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 opacity-40 animate-pulse-slow delay-200" />
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-12 tracking-tight">
          How was your last session?
        </h1>

        {/* Rating Scale */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { rating: "bad", icon: Frown, color: "red" },
            { rating: "good", icon: Meh, color: "yellow" },
            { rating: "great", icon: Smile, color: "green" }
          ].map(({ rating, icon: Icon, color }) => (
            <Button
              key={rating}
              onClick={() => handleRatingSelect(rating as FeedbackRating)}
              className={`w-20 h-20 rounded-full transition-all duration-300 ${
                selectedRating === rating
                  ? `scale-110 ${
                      color === "red"
                        ? "bg-red-500 hover:bg-red-600"
                        : color === "yellow"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Icon
                className={`w-10 h-10 transition-colors ${
                  selectedRating === rating ? "text-white" : "text-gray-400"
                }`}
              />
            </Button>
          ))}
        </div>

        {/* Consistency Reminder */}
        <p className="text-white/70 text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto">
          Remember, visualization only works if you're consistent. Train your brain to align with your goals, and real results will follow.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            onClick={handleReplay}
            className="min-w-[200px] py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl
              transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Replay Session
          </Button>
          <Button
            onClick={handleSubmit}
            className="min-w-[200px] py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 
              text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {selectedRating ? "Submit & Finish" : "Skip & Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionFeedbackPage;
