
import { FC } from "react";
import { Link } from "react-router-dom";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();
  const { triggerHaptic, vibrate } = useHapticFeedback();
  
  const handleClick = () => {
    triggerHaptic();
    vibrate(20);
  };
  
  return (
    <footer className={`w-full py-4 px-3 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-3">
          {/* Main footer content - more compact layout */}
          <div className="w-full flex flex-row flex-wrap justify-between items-center">
            <div className="flex items-center mr-4">
              <img 
                src="/lovable-uploads/d923baf7-78e1-40d3-9b06-3741979d91d1.png" 
                alt="ClarityQuest" 
                className="w-[100px] h-auto" 
              />
            </div>
            
            <div className="flex flex-row flex-wrap gap-6">
              <div className="text-left">
                <h3 className="text-sm text-white font-medium mb-1">About</h3>
                <ul>
                  <li>
                    <Link 
                      to="/science" 
                      className="text-gray-300 hover:text-primary transition-colors text-xs"
                      onClick={handleClick}
                    >
                      The Science
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="text-left">
                <h3 className="text-sm text-white font-medium mb-1">Get Started</h3>
                <ul>
                  <li>
                    <Link 
                      to="/login?mode=signup" 
                      className="text-gray-300 hover:text-primary transition-colors text-xs"
                      onClick={handleClick}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/login" 
                      className="text-gray-300 hover:text-primary transition-colors text-xs"
                      onClick={handleClick}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Copyright and legal links - more compact */}
          <div className="pt-2 border-t border-white/10 w-full">
            <div className="flex flex-row flex-wrap justify-between items-center gap-2">
              <p className="text-white/50 text-xs">© {currentYear} ClarityQuest</p>
              <div className="flex gap-3">
                <Link 
                  to="/privacy-policy" 
                  className="text-white/40 hover:text-white/60 text-xs transition-colors"
                  onClick={handleClick}
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms-of-service" 
                  className="text-white/40 hover:text-white/60 text-xs transition-colors"
                  onClick={handleClick}
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
