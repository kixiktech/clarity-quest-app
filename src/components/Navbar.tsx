
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="animate-text-gradient">ClarityQuest</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground/70"
              }`}
            >
              Home
            </Link>
            <Link
              to="/science"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/science") ? "text-primary" : "text-foreground/70"
              }`}
            >
              The Science
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
