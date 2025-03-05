
import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`glass py-3 px-4 text-xs text-center ${className}`}>
      <div className="flex flex-wrap justify-center gap-3 items-center">
        <span>© {new Date().getFullYear()} ClarityQuest</span>
        <div className="flex gap-3">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
