
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface SetIntentionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const SetIntentionsModal: FC<SetIntentionsModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">
            Set Your Intentions
          </DialogTitle>
          <DialogDescription className="text-center text-white/80">
            Before you begin, please take a moment to answer the upcoming questions thoughtfully.
            Your detailed responses allow us to craft personalized visualization sessions tailored
            specifically for you. The more specific you are, the more effective your sessions will
            be—hacking your brain into achieving your wildest dreams and creating your ideal reality.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center">
          <p className="text-sm text-white/60 text-center mb-4">
            You can edit your answers later.
          </p>
          <Button
            onClick={onContinue}
            className="w-full sm:w-auto py-6 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Let's Begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetIntentionsModal;
