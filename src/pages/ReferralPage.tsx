
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Gift, Share2, Copy, Users, CheckCircle, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ReferralPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>("");
  const [referrals, setReferrals] = useState<any[]>([]);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [credits, setCredits] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  // Fetch user session and generate/retrieve referral code
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Not logged in",
            description: "Please sign in to manage your referrals",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        setUser(user);
        
        // Generate or retrieve referral code (using user id for simplicity)
        // In a real app, you might want to generate a more user-friendly code
        const userIdCode = user.id.split("-")[0];
        setReferralCode(userIdCode);
        
        // Fetch referrals made by this user
        const { data: referralData, error: referralError } = await supabase
          .from("referrals")
          .select("*")
          .eq("referrer_id", user.id);
          
        if (referralError) throw referralError;
        setReferrals(referralData || []);
        
        // Fetch session credits
        const { data: creditData, error: creditError } = await supabase
          .from("session_credits")
          .select("referral_credits")
          .eq("user_id", user.id)
          .single();
          
        if (creditError && creditError.code !== "PGRST116") throw creditError;
        setCredits(creditData?.referral_credits || 0);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load your referral information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate, toast]);

  const handleShareLink = () => {
    setShowShareDialog(true);
  };
  
  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/login?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      toast({
        title: "Link copied!",
        description: "Share this link with your friends",
      });
    });
  };
  
  const handleShareViaOptions = async () => {
    const referralLink = `${window.location.origin}/login?ref=${referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on MindQuest",
          text: "Try this amazing app and we'll both get a free session!",
          url: referralLink
        });
        toast({
          title: "Shared successfully!",
          description: "Thanks for sharing MindQuest with your friends!"
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
    
    setShowShareDialog(false);
  };

  // Animation classes for cards
  const cardAnimationClasses = [
    "animate-[fadeIn_0.4s_ease-in-out]",
    "animate-[fadeIn_0.6s_ease-in-out]", 
    "animate-[fadeIn_0.8s_ease-in-out]",
    "animate-[fadeIn_1.0s_ease-in-out]"
  ];

  return (
    <div className="min-h-[100dvh] px-4 pt-6 pb-20 overflow-x-hidden">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mr-2 text-primary-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-primary-foreground">Invite Friends</h1>
      </div>
      
      {/* Main content */}
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm border border-white/10 animate-[fadeIn_0.5s_ease-in-out]">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-[float_4s_ease-in-out_infinite]">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary-foreground mb-3">Get Free Sessions</h2>
            <p className="text-primary-foreground/80 mb-6">
              Invite your friends and both of you will receive a free session when they join!
            </p>
            <Button 
              onClick={handleShareLink}
              size="lg" 
              className="w-full max-w-xs button-shine relative overflow-hidden bg-primary text-primary-foreground flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Your Invite Link
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Free Sessions Card */}
          <div className={`bg-card p-4 rounded-xl flex flex-col items-center text-center ${cardAnimationClasses[0]}`}>
            <Award className="w-8 h-8 text-primary mb-2" />
            <p className="text-primary-foreground/70 text-sm mb-1">Free Sessions</p>
            <p className="text-3xl font-bold text-primary-foreground">{credits}</p>
          </div>
          
          {/* Total Referrals Card */}
          <div className={`bg-card p-4 rounded-xl flex flex-col items-center text-center ${cardAnimationClasses[1]}`}>
            <Users className="w-8 h-8 text-primary mb-2" />
            <p className="text-primary-foreground/70 text-sm mb-1">Friends Invited</p>
            <p className="text-3xl font-bold text-primary-foreground">{referrals.length}</p>
          </div>
        </div>
        
        {/* How It Works */}
        <div className={`bg-card p-6 rounded-xl ${cardAnimationClasses[2]}`}>
          <h3 className="text-xl font-bold text-primary-foreground mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="text-primary-foreground/80">Share your unique referral link with friends</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="text-primary-foreground/80">They sign up using your link</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="text-primary-foreground/80">You both get a free session when they join!</p>
            </div>
          </div>
        </div>
        
        {/* Referrals List */}
        <div className={`bg-card p-6 rounded-xl ${cardAnimationClasses[3]}`}>
          <h3 className="text-xl font-bold text-primary-foreground mb-4">Your Invites</h3>
          
          {loading ? (
            <div className="py-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : referrals.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-primary-foreground/60">You haven't invited anyone yet.</p>
              <p className="text-primary-foreground/60">Share your link to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary-foreground text-sm">Friend #{index + 1}</p>
                      <p className="text-primary-foreground/60 text-xs">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {referral.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="text-xs text-primary-foreground/60 px-2 py-1 bg-secondary rounded">
                      Pending
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share your referral link</DialogTitle>
            <DialogDescription>
              When friends use this link, you'll both get free sessions!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-4">
            <Input
              value={`${window.location.origin}/login?ref=${referralCode}`}
              readOnly
              className="flex-1"
            />
            <Button onClick={handleCopyLink} size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleShareViaOptions} className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferralPage;
