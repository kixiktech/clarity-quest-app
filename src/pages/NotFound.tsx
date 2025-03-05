
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    // Matrix code characters
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789Z";
    
    // Matrix rain configuration
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);
    
    // Draw the Matrix rain
    function draw() {
      // Semi-transparent black background to create fade effect
      ctx.fillStyle = "rgba(34, 23, 55, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text style
      ctx.fillStyle = "rgba(139, 92, 246, 0.35)"; // Purple tint
      ctx.font = `${fontSize}px VT323`;
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Random character from chars
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // If the drop is at the bottom or randomly restarts, reset it
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
    }
    
    // Animation loop
    const intervalId = setInterval(draw, 50);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 opacity-60"
      aria-hidden="true"
    />
  );
};

const GlitchText = ({ text }: { text: string }) => {
  const [glitching, setGlitching] = useState(false);
  
  useEffect(() => {
    // Glitch effect at random intervals
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 100);
    }, Math.random() * 5000 + 1000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  return (
    <h1 
      className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-purple-400 
        tracking-tight leading-tight ${glitching ? 'animate-pulse' : ''}`}
    >
      {text}
    </h1>
  );
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Matrix Code Rain Background */}
      <CodeRain />
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-4 py-8 max-w-md">
        {/* Headline */}
        <GlitchText text="404: You've Taken a Wrong Turn in the Matrix" />
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-purple-200 mb-8 font-light">
          Let's guide you back to reality. The quest for clarity continues elsewhere...
        </p>
        
        {/* Return Home Button */}
        <Link to="/">
          <Button 
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-lg font-medium px-8 py-6 rounded-xl
              transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-500/40"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
