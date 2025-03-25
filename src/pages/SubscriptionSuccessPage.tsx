
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import confetti from "canvas-confetti";

const SubscriptionSuccessPage: FC = () => {
  const navigate = useNavigate();
  const { triggerHaptic } = useHapticFeedback();

  useEffect(() => {
    // Trigger confetti animation when the component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const runConfetti = () => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) return;
      
      const particleCount = 50;
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 100,
        origin: { y: 0.6, x: randomInRange(0.3, 0.7) },
        colors: ['#FFD700', '#FFA500', '#9370DB', '#7B68EE', '#4ADE80'],
        ticks: 300,
      });
      
      if (timeLeft > 0) {
        requestAnimationFrame(runConfetti);
      }
    };
    
    runConfetti();
  }, []);

  const handleContinue = () => {
    triggerHaptic();
    navigate("/session-categories");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Gradient background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_100%)]" />
      
      {/* Success content */}
      <Card className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl relative z-10 overflow-hidden animate-fade-in">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
        
        <CardContent className="p-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-arcade text-yellow-400 text-center mb-4">
            Welcome to Unlimited Visualization!
          </h1>
          
          <p className="text-center text-white/90 mb-6">
            Thank you for subscribing! You now have full access to unlock your mind's
            potential through our neuroscience-backed visualization sessions.
          </p>
          
          <div className="space-y-4 w-full mb-6">
            {[
              "Unlimited visualization sessions",
              "Neuroscience-backed techniques",
              "Consistent practice for optimal results",
              "Full access to all categories"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleContinue}
            className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black flex items-center justify-center gap-2 transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Continue to Visualization</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <p className="text-white/60 text-xs text-center mt-6">
            Your journey to growth and transformation starts now. 
            Consistency is key—visualize daily for best results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSuccessPage;
