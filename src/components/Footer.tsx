
import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`w-full py-6 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Main footer content */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <img 
                src="/lovable-uploads/d923baf7-78e1-40d3-9b06-3741979d91d1.png" 
                alt="ClarityQuest" 
                className="w-[120px] h-auto" 
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
              <div className="text-center sm:text-left">
                <h3 className="text-lg text-white font-medium mb-2">About</h3>
                <ul className="space-y-1">
                  <li><Link to="/science" className="text-gray-300 hover:text-primary transition-colors text-base">The Science</Link></li>
                </ul>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg text-white font-medium mb-2">Get Started</h3>
                <ul className="space-y-1">
                  <li><Link to="/login?mode=signup" className="text-gray-300 hover:text-primary transition-colors text-base">Sign Up</Link></li>
                  <li><Link to="/login" className="text-gray-300 hover:text-primary transition-colors text-base">Login</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Copyright and legal links - smaller and less noticeable */}
          <div className="pt-4 border-t border-white/10 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-white/50 text-xs mb-2 sm:mb-0">© {currentYear} ClarityQuest. All rights reserved.</p>
              <div className="flex gap-4">
                <Link to="/privacy-policy" className="text-white/40 hover:text-white/60 text-xs transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-white/40 hover:text-white/60 text-xs transition-colors">
                  Terms of Service
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
