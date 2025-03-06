
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Share, Sparkles, X } from "lucide-react";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PaywallPage: FC = () => {
  const navigate = useNavigate();
  const { triggerHaptic } = useHapticFeedback();
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState<string>("");
  const [showReferralDialog, setShowReferralDialog] = useState(false);

  const handleShare = () => {
    triggerHaptic();
    navigate("/share-earn");
  };

  const handleUpgrade = () => {
    triggerHaptic();
    // In a real implementation, navigate to subscription page
    // For now, we'll just show a toast
    toast({
      title: "Upgrade Coming Soon",
      description: "Subscription functionality is under development",
    });
  };

  const handleClose = () => {
    triggerHaptic();
    navigate("/session-categories");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Gradient background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_100%)]" />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl p-6 sm:p-8 animate-fade-in">
        {/* Close button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-arcade text-center text-yellow-400 mb-4">
          Stay on the Path to Your Goals
        </h1>
        
        {/* Subheading */}
        <p className="text-center text-white/90 mb-6">
          Science shows visualization is <span className="text-yellow-400 font-bold">400% more effective</span> when practiced consistently. You're on the right track—keep going!
        </p>
        
        {/* Main message */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <p className="text-white/80 text-center">
            You've used your free session for this week. To keep visualizing and see real results, you can:
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="space-y-4">
          {/* Share Button */}
          <Button 
            onClick={handleShare}
            className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2"
          >
            <Share className="h-5 w-5" />
            <span>Share & Earn Free Sessions</span>
          </Button>
          <p className="text-white/60 text-xs text-center">
            Get 2 free sessions for each friend who signs up!
          </p>
          
          {/* Upgrade Button */}
          <Button 
            onClick={handleUpgrade}
            className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="h-5 w-5" />
            <span>Go Unlimited</span>
          </Button>
          <p className="text-white/60 text-xs text-center">
            Enjoy unlimited sessions all month long - $25/month or $210/year
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallPage;
