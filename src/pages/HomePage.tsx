
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Transform Your Dreams Into{" "}
          <span className="animate-text-gradient">Reality</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
          Unlock the power of guided visualization and meditation to achieve your goals
          with purpose and clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/science")}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
          >
            The Science
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 glass rounded-lg p-4 max-w-xs animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
        <p className="text-sm text-foreground/70">
          <span className="text-primary font-medium">Sarah from California</span> just
          completed a meditation session
        </p>
      </div>
    </div>
  );
};

export default HomePage;
