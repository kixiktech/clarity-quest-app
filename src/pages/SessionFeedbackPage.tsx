
import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Frown, Meh, Smile, X, Play } from "lucide-react";
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
      <div className="w-full flex flex-col items-center justify-between h-[100dvh] py-16">
        {/* Header Section */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          {/* Central Pulsating Orb */}
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-pulse-slow" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-xl animate-pulse-slow delay-100" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 opacity-40 animate-pulse-slow delay-200" />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-8 tracking-tight">
            How was your last session?
          </h1>

          {/* Rating Scale */}
          <div className="flex justify-center items-center gap-8 sm:gap-12 mb-6">
            {[
              { rating: "bad", icon: Frown, color: "red" },
              { rating: "good", icon: Meh, color: "yellow" },
              { rating: "great", icon: Smile, color: "green" }
            ].map(({ rating, icon: Icon, color }) => (
              <div
                key={rating}
                onClick={() => handleRatingSelect(rating as FeedbackRating)}
                className="relative touch-manipulation cursor-pointer"
              >
                <div className="p-3 transition-all duration-300 hover:scale-110 active:scale-95">
                  <Icon
                    strokeWidth={1.75}
                    className={`w-16 h-16 sm:w-20 sm:h-20 transition-all duration-300 ${
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

          {/* Consistency Reminder */}
          <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed max-w-xs text-center">
            Remember, visualization only works if you're consistent. Train your brain to align with your goals.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            onClick={handleReplay}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl
              transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className="w-5 h-5 mr-2" />
            Replay Session
          </Button>
          <Button
            onClick={handleSubmit}
            className={`w-full py-5 text-white font-medium rounded-xl
              transition-all duration-300 hover:scale-105 active:scale-95
              ${selectedRating 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 shadow-lg shadow-amber-500/30 animate-pulse-slow'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
              }`}
          >
            {selectedRating ? "Submit & Finish" : "Skip & Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionFeedbackPage;
