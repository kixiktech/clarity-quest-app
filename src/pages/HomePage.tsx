
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Debug background image loading
    const img = new Image();
    img.src = '/lovable-uploads/2d55cc49-adfd-4ca9-986b-02308c2a0bc7.png';
    img.onload = () => console.log('Background image loaded successfully');
    img.onerror = (e) => console.error('Background image failed to load:', e);

    // Debug body styles
    console.log('Body background:', document.body.style.backgroundImage);
    console.log('Body computed style:', window.getComputedStyle(document.body).backgroundImage);
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col items-center px-8 pt-20 overflow-hidden relative">
      {/* Debug element to verify image URL */}
      <div className="fixed top-0 left-0 w-1 h-1 opacity-0">
        <img 
          src="/lovable-uploads/2d55cc49-adfd-4ca9-986b-02308c2a0bc7.png" 
          onLoad={() => console.log('Test image loaded')}
          onError={(e) => console.error('Test image failed:', e)}
          alt=""
        />
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-5xl text-primary font-semibold tracking-tight">
          CLARITYQUEST
        </h1>
        <p className="text-lg text-primary uppercase tracking-wide">
          unlock your mind. visualize with purpose.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 -mt-20">
        <button
          onClick={() => navigate("/login")}
          className="w-64 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg uppercase"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/science")}
          className="w-64 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg uppercase"
        >
          The Science
        </button>
      </div>

      <div className="glass rounded-lg p-4 max-w-[280px] mb-8 animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
        <p className="text-sm text-foreground/70">
          <span className="text-primary font-medium">Sarah from California</span> just
          completed a meditation session
        </p>
      </div>
    </div>
  );
};

export default HomePage;
