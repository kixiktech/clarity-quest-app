
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { Mail, MessageCircle, Share2 } from "lucide-react";
import { SUBSCRIPTION_PRICES } from "@/lib/stripe";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  const handleShare = async (type: "email" | "sms" | "general") => {
    const shareText = "Hey, check out ClarityQuest—a personalized visualization app that uses neuroscience to help you achieve your goals and dreams. Join me and start transforming your life!";
    const shareUrl = window.location.origin;

    switch (type) {
      case "email":
        window.location.href = `mailto:?subject=Transform%20your%20life%20with%20ClarityQuest&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
        break;
      case "sms":
        window.location.href = `sms:?&body=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "general":
        try {
          await navigator.share({
            title: "ClarityQuest",
            text: shareText,
            url: shareUrl,
          });
        } catch (err) {
          console.error("Share failed:", err);
        }
        break;
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: SUBSCRIPTION_PRICES[plan].id,
        }),
      });

      const { sessionUrl } = await response.json();
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">
            You're on the right path!
          </DialogTitle>
          <DialogDescription className="text-center text-white/80">
            Science shows that visualization works 400% better when you are consistent.
            However, you have already used your free session for the week on the free plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Referral Section */}
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-white/90 text-sm">
              Invite a friend and get 1 free visualization session credit each time they sign up.
              You can invite as many friends as you like!
            </p>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("email")}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("sms")}
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                SMS
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("general")}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Subscription Toggle */}
          <div className="space-y-4">
            <div className="flex justify-center gap-4 p-2 bg-white/5 rounded-lg">
              <Toggle
                pressed={plan === "monthly"}
                onPressedChange={() => setPlan("monthly")}
                className="data-[state=on]:bg-primary"
              >
                Monthly
              </Toggle>
              <Toggle
                pressed={plan === "annual"}
                onPressedChange={() => setPlan("annual")}
                className="data-[state=on]:bg-primary"
              >
                Annual
              </Toggle>
            </div>

            <div className="text-center space-y-2">
              <p className="text-2xl font-bold text-primary">
                ${plan === "monthly" ? "25" : "210"}
                <span className="text-sm font-normal text-white/60">
                  /{plan === "monthly" ? "month" : "year"}
                </span>
              </p>
              <p className="text-sm text-white/60">
                Just ${SUBSCRIPTION_PRICES[plan].perDay} per day
              </p>
            </div>
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Upgrade for Unlimited Access
          </Button>

          {/* Footer Text */}
          <p className="text-sm text-center text-white/60">
            Our process is built on actual neuroscience and is proven to help you become
            the person who can accomplish your wildest goals, dreams, and aspirations.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
