
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-primary">ClarityQuest</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
