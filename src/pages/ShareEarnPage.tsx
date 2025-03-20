import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Mail, MessageSquare, Share2, Facebook, Twitter, Check } from "lucide-react";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Icons } from "@/components/Icons";

const ShareEarnPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { triggerHaptic } = useHapticFeedback();
  const [referralLink, setReferralLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    sessionsEarned: 0
  });
  const [referralLinkInputRef, setReferralLinkInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    generateReferralLink();
    fetchReferralStats();
  }, []);

  const generateReferralLink = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to share",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      
      // Use hash-based routing to ensure the link works on all hosting providers
      const baseUrl = window.location.origin;
      const referralCode = user.id.substring(0, 8); // Using part of the user ID
      
      // Create the full URL with hash routing to avoid 404 errors
      const fullReferralLink = `${baseUrl}/#/login?ref=${referralCode}`;
      
      setReferralLink(fullReferralLink);
    } catch (error) {
      console.error("Error generating referral link:", error);
      toast({
        title: "Error",
        description: "Could not generate referral link",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReferralStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Get referral count
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .eq('status', 'completed');

      if (referralsError) {
        console.error("Error fetching referrals:", referralsError);
        return;
      }

      // Get credit info
      const { data: credits, error: creditsError } = await supabase
        .from('session_credits')
        .select('referral_credits')
        .eq('user_id', user.id)
        .single();

      if (creditsError && creditsError.code !== 'PGRST116') {
        console.error("Error fetching credits:", creditsError);
        return;
      }

      setReferralStats({
        totalReferrals: referrals?.length || 0,
        sessionsEarned: credits?.referral_credits || 0
      });
    } catch (error) {
      console.error("Error fetching referral stats:", error);
    }
  };

  const handleCopyLink = async () => {
    triggerHaptic();
    
    try {
      // iOS-specific handling for clipboard
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // For iOS, we need to use a different approach
        // First try to select and copy using the input element reference
        if (referralLinkInputRef) {
          referralLinkInputRef.select();
          referralLinkInputRef.setSelectionRange(0, 99999);
          
          // Try the document.execCommand method first (works in most iOS browsers)
          const successful = document.execCommand('copy');
          
          if (successful) {
            setIsCopied(true);
            toast({
              title: "Link copied!",
              description: "Referral link copied to clipboard",
            });
            
            setTimeout(() => setIsCopied(false), 2000);
            return;
          }
        }
      }
      
      // For non-iOS devices or as fallback, try the Clipboard API
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      toast({
        title: "Link copied!",
        description: "Referral link copied to clipboard",
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      
      // Try one more fallback method for iOS
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && referralLinkInputRef) {
        try {
          // Alert the user they need to copy manually
          toast({
            title: "Please copy manually",
            description: "Tap and hold on the link to copy it",
            variant: "default",
          });
          
          // Focus and select the text to make it easier for manual copying
          referralLinkInputRef.focus();
          referralLinkInputRef.select();
          referralLinkInputRef.setSelectionRange(0, 99999);
          return;
        } catch (fallbackError) {
          console.error("Even fallback failed:", fallbackError);
        }
      }
      
      toast({
        title: "Error",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleShareVia = async (platform: string) => {
    triggerHaptic();
    
    const shareMessage = "Transform your reality with visualization! Join me on ClarityQuest and we'll both get free sessions.";
    
    switch (platform) {
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Join me on ClarityQuest",
              text: shareMessage,
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
          handleCopyLink();
        }
        break;
        
      case 'email':
        // Add the base URL as fallback in case the link breaks
        const emailBody = `${shareMessage} ${referralLink}\n\nIf the link doesn't work, visit ${window.location.origin} and use my referral code: ${referralLink.split('ref=')[1]}`;
        window.open(`mailto:?subject=Join me on ClarityQuest&body=${encodeURIComponent(emailBody)}`);
        break;
        
      case 'sms':
        // Add the base URL as fallback in case the link breaks
        const smsBody = `${shareMessage} ${referralLink}\n\nIf the link doesn't work, visit ${window.location.origin} and use my referral code: ${referralLink.split('ref=')[1]}`;
        window.open(`sms:?body=${encodeURIComponent(smsBody)}`);
        break;
        
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareMessage)}`);
        break;
        
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(referralLink)}`);
        break;
    }
  };

  const handleBack = () => {
    triggerHaptic();
    navigate("/paywall");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_100%)]" />
      
      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl p-6 sm:p-8 animate-fade-in">
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 text-white/60 hover:text-white p-2 h-auto"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <h1 className="text-2xl sm:text-3xl font-arcade text-center text-yellow-400 mb-4 mt-4">
          Unlock More Free Sessions
        </h1>
        
        <p className="text-center text-white/90 mb-6">
          Self-improvement is a journey—each friend you invite brings you closer to your best self. Our neuroscience-backed techniques show that sharing and consistent practice amplify your transformation.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-yellow-400 text-xl font-bold">{referralStats.totalReferrals}</p>
            <p className="text-white/80 text-sm">Friends Joined</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-yellow-400 text-xl font-bold">{referralStats.sessionsEarned}</p>
            <p className="text-white/80 text-sm">Sessions Earned</p>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-white/80 text-sm mb-2">Your Unique Referral Link</label>
          <div className="flex gap-2">
            {isLoading ? (
              <div className="w-full h-10 bg-white/5 rounded-md flex items-center justify-center">
                <Icons.spinner className="h-5 w-5 text-white/60" />
              </div>
            ) : (
              <Input 
                value={referralLink} 
                readOnly 
                className="flex-1 bg-white/10 border-white/20 text-white"
                ref={(input) => setReferralLinkInputRef(input)}
                onClick={(e) => {
                  // Select all text when clicked (helps with manual copying)
                  e.currentTarget.select();
                }}
              />
            )}
            <Button 
              onClick={handleCopyLink} 
              className="bg-indigo-600 hover:bg-indigo-500"
              disabled={isLoading}
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <p className="text-white/80 text-center">
            For every friend who signs up with your link, you'll earn 2 free sessions. There's no limit—share as often as you like and fuel your journey to unlock your full potential.
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-white/80 text-sm mb-3 text-center">Share via:</p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => handleShareVia('native')}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => handleShareVia('email')}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => handleShareVia('sms')}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => handleShareVia('facebook')}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
              onClick={() => handleShareVia('twitter')}
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full text-white/80 hover:text-white border border-white/20"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ShareEarnPage;
