
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const UpgradePage = () => {
  const navigate = useNavigate();
  const { triggerHaptic } = useHapticFeedback();
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Stripe payment links
  const MONTHLY_PLAN_LINK = "https://buy.stripe.com/bIY5nBd7y2L79cQfYY";
  const ANNUAL_PLAN_LINK = "https://buy.stripe.com/3cs6rF6Ja0CZ0Gk001";
  
  const handleBack = () => {
    triggerHaptic();
    navigate("/paywall");
  };

  const handleUpgrade = () => {
    triggerHaptic();
    
    // Redirect to the appropriate Stripe payment link based on the selected plan
    const paymentLink = isAnnual ? ANNUAL_PLAN_LINK : MONTHLY_PLAN_LINK;
    
    if (paymentLink) {
      window.location.href = paymentLink;
    } else {
      // Fallback if no payment link is provided yet
      toast({
        title: "Subscription Coming Soon",
        description: "Stripe integration is under development",
      });
    }
  };

  const monthlyPrice = 25;
  const annualPrice = 210;
  const monthlyCostPerDay = (monthlyPrice / 30).toFixed(2);
  const annualCostPerDay = (annualPrice / 365).toFixed(2);
  const savingsPercentage = Math.round(100 - ((annualPrice / 12) / monthlyPrice * 100));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Gradient background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_100%)]" />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl p-6 sm:p-8 animate-fade-in">
        {/* Back button */}
        <button 
          onClick={handleBack} 
          className="absolute top-4 left-4 text-white/60 hover:text-white transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-arcade text-center text-yellow-400 mt-6 mb-4">
          Unlock Unlimited Visualization
        </h1>
        
        {/* Subheading */}
        <p className="text-center text-white/90 mb-8">
          Transform your mindset and fuel your journey with our neuroscience-backed sessions. 
          Upgrade now for consistent, life-changing results.
        </p>
        
        {/* Pricing toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Label 
              htmlFor="subscription-toggle" 
              className={`text-sm cursor-pointer ${!isAnnual ? 'text-yellow-400 font-bold' : 'text-white/70'}`}
            >
              Monthly
            </Label>
            <Switch 
              id="subscription-toggle" 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-yellow-500"
            />
            <Label 
              htmlFor="subscription-toggle" 
              className={`text-sm cursor-pointer ${isAnnual ? 'text-yellow-400 font-bold' : 'text-white/70'}`}
            >
              Annual
            </Label>
          </div>
          
          {/* Pricing details */}
          <div className="bg-white/5 rounded-lg p-6 mb-4">
            <div className="text-center">
              <span className="text-4xl font-bold text-white">${isAnnual ? annualPrice : monthlyPrice}</span>
              <span className="text-white/70">/{isAnnual ? 'year' : 'month'}</span>
            </div>
            
            <div className="text-center text-white/70 mt-2">
              Just ${isAnnual ? annualCostPerDay : monthlyCostPerDay} per day
            </div>
            
            {isAnnual && (
              <div className="mt-4 text-center">
                <span className="bg-yellow-500/20 text-yellow-400 py-1 px-3 rounded-full text-sm">
                  Save {savingsPercentage}% with annual plan
                </span>
              </div>
            )}
          </div>
          
          <p className="text-center text-white/60 text-sm">
            Cancel anytime – no long-term commitments. Invest in your growth risk-free.
          </p>
        </div>
        
        {/* Additional CTA button */}
        <Button 
          onClick={handleUpgrade}
          className="w-full mb-8 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black flex items-center justify-center gap-2 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="h-5 w-5" />
          <span>Upgrade Now</span>
        </Button>
        
        {/* Benefits section */}
        <div className="mb-8">
          <h2 className="text-xl text-white/90 mb-4 text-center">What You'll Get</h2>
          <ul className="space-y-3">
            {[
              "Unlimited access to personalized visualization sessions",
              "Consistent practice leads to 400% more effective results",
              "Backed by neuroscience to help you achieve your goals",
              "Stay on track and unlock your full potential"
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA button */}
        <Button 
          onClick={handleUpgrade}
          className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black flex items-center justify-center gap-2 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="h-5 w-5" />
          <span>Upgrade Now</span>
        </Button>
        
        {/* Reassurance footer */}
        <p className="text-white/60 text-xs text-center mt-4">
          You can cancel anytime – no strings attached. Your journey, your pace.
        </p>
      </div>
    </div>
  );
};

export default UpgradePage;
