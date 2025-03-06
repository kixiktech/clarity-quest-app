
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

  // Generate or fetch the user's referral link
  const getReferralLink = async () => {
    try {
      triggerHaptic();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to share",
          variant: "destructive",
        });
        return;
      }
      
      // In a real implementation, you would generate/fetch a unique code
      // For now, we'll use the user's ID as part of the referral code
      const baseUrl = window.location.origin;
      const referralCode = user.id.substring(0, 8); // Using part of the user ID as a simple example
      const fullReferralLink = `${baseUrl}/login?ref=${referralCode}`;
      
      setReferralLink(fullReferralLink);
      setShowReferralDialog(true);
    } catch (error) {
      console.error("Error generating referral link:", error);
      toast({
        title: "Error",
        description: "Could not generate referral link",
        variant: "destructive",
      });
    }
  };

  const handleShareLink = async () => {
    triggerHaptic();
    
    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on ClarityQuest",
          text: "Transform your reality with visualization! Join me on ClarityQuest and we'll both get free sessions.",
          url: referralLink,
        });
        
        toast({
          title: "Shared!",
          description: "Thank you for sharing ClarityQuest",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // User probably cancelled sharing
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link copied!",
        description: "Referral link copied to clipboard",
      });
    }
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
            onClick={getReferralLink}
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
        
        {/* Referral Dialog */}
        <Dialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
          <DialogContent className="bg-black/80 backdrop-blur-xl border-white/10 text-white">
            <h2 className="text-xl font-arcade text-yellow-400 mb-4">
              Share Your Unique Link
            </h2>
            
            <div className="bg-white/10 p-4 rounded-md mb-4 overflow-auto">
              <code className="text-green-400 text-sm break-all">{referralLink}</code>
            </div>
            
            <p className="text-white/70 mb-4 text-sm">
              Share this link with friends. You'll both receive 2 free sessions when they sign up!
            </p>
            
            <Button 
              onClick={handleShareLink} 
              className="w-full bg-indigo-600 hover:bg-indigo-500"
            >
              <Share className="mr-2 h-4 w-4" />
              Share Link
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PaywallPage;
