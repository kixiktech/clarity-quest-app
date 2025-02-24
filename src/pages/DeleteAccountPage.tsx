
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DeleteAccountPage: FC = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Please type DELETE to confirm account deletion");
      return;
    }

    toast.success(
      "We are sorry to see you go. We hope you have a pleasant rest of your day. Keep visualizing! It is the key to unlocking your full potential."
    );

    // Add actual account deletion logic here
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col p-6">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="self-start mb-8 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">Delete Account</h1>
          <p className="text-foreground/80">Game Over?</p>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-500">
            <span className="font-bold block mb-1">CRITICAL WARNING!</span>
            This action cannot be undone. All your progress, achievements, and saved data will be permanently erased from our servers.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground/80">
              Before you go, could you tell us why you're leaving? Your feedback helps us improve!
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Share your thoughts with us..."
              className="h-32"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/80">
              To confirm deletion, please type "DELETE" in the box below
            </label>
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="font-mono"
            />
          </div>

          <Button
            onClick={handleDeleteAccount}
            variant="destructive"
            className="w-full"
            disabled={deleteConfirmation !== "DELETE"}
          >
            Permanently Delete Account
          </Button>
        </div>

        <p className="text-sm text-center text-foreground/60 pt-4">
          Remember: Visualization is a powerful tool. Your journey doesn't have to end here.
        </p>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
