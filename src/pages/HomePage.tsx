import { FC } from "react";
import { useNavigate } from "react-router-dom";
const HomePage: FC = () => {
  const navigate = useNavigate();
  return <div className="h-[100dvh] flex flex-col items-center px-8 pt-20 overflow-hidden">
      <div className="text-center space-y-4">
        <h1 className="text-5xl text-primary font-semibold tracking-tight">
          CLARITYQUEST
        </h1>
        <p className="text-primary uppercase tracking-wide text-sm">unlock the power of your mind.
VISUALIZE WITH PURPOSE.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 -mt-20">
        <button onClick={() => navigate("/login")} className="w-64 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg uppercase">
          Get Started
        </button>
        <button onClick={() => navigate("/science")} className="w-64 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg uppercase">
          The Science
        </button>
      </div>

      <div className="glass rounded-lg p-4 max-w-[280px] mb-8 animate-fade-in opacity-0" style={{
      animationDelay: "1s"
    }}>
        <p className="text-sm text-foreground/70">
          <span className="text-primary font-medium">Sarah from California</span> just
          completed a meditation session
        </p>
      </div>
    </div>;
};
export default HomePage;