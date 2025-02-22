
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
    <div className="w-full max-w-2xl space-y-4">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] p-4 text-lg bg-white/5 border-white/10 rounded-xl"
        />
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={toggleListening}
          className={`w-48 py-6 rounded-xl font-medium text-lg relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
            before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
            after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
            after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
            hover:scale-105 active:scale-95
            ${isListening ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
        >
          {isListening ? (
            <>
              <MicOff className="mr-2 h-5 w-5" />
              <span className="relative z-10">Stop Recording</span>
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" />
              <span className="relative z-10">Start Recording</span>
            </>
          )}
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="w-48 py-6 rounded-xl bg-primary text-primary-foreground font-medium text-lg relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
            before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
            after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
            after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
            hover:scale-105 active:scale-95"
        >
          <Send className="mr-2 h-5 w-5" />
          <span className="relative z-10">Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default VoiceTextInput;
