
import { FC, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface VoiceTextInputProps {
  onSubmit: (text: string) => void;
  placeholder: string;
}

const VoiceTextInput: FC<VoiceTextInputProps> = ({ onSubmit, placeholder }) => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const { toast } = useToast();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setText(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: "There was an error with speech recognition. Please try again or use text input.",
          variant: "destructive"
        });
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Please use text input instead.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setText('');
    }
    setIsListening(!isListening);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
      if (isListening) {
        toggleListening();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] p-3 text-base sm:text-lg bg-white/5 border-white/10 rounded-xl resize-none"
        />
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={toggleListening}
          className={`py-2 px-4 rounded-xl font-medium text-base relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
            ${isListening ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
        >
          {isListening ? (
            <>
              <MicOff className="mr-2 h-4 w-4" />
              <span className="relative z-10">Stop</span>
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" />
              <span className="relative z-10">Record</span>
            </>
          )}
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="py-2 px-4 rounded-xl bg-primary text-primary-foreground font-medium text-base relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out"
        >
          <Send className="mr-2 h-4 w-4" />
          <span className="relative z-10">Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default VoiceTextInput;
