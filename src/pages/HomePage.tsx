import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";

const notifications = [
  { name: "Sarah", state: "California" },
  { name: "Michael", state: "New York" },
  { name: "Emma", state: "Texas" },
  { name: "James", state: "Florida" },
  { name: "Olivia", state: "Washington" },
  { name: "William", state: "Oregon" },
  { name: "Ava", state: "Colorado" },
  { name: "Alexander", state: "Arizona" },
  { name: "Sophia", state: "Nevada" },
  { name: "Benjamin", state: "Utah" },
  { name: "Isabella", state: "Idaho" },
  { name: "Lucas", state: "Montana" },
  { name: "Mia", state: "Wyoming" },
  { name: "Henry", state: "New Mexico" },
  { name: "Charlotte", state: "Oklahoma" },
  { name: "Sebastian", state: "Kansas" },
  { name: "Amelia", state: "Nebraska" },
  { name: "Jack", state: "Iowa" },
  { name: "Harper", state: "Minnesota" },
  { name: "Daniel", state: "Wisconsin" }
];

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsEntering(false);
      setTimeout(() => {
        setCurrentNotificationIndex((prev) => (prev + 1) % notifications.length);
        setIsEntering(true);
      }, 500);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BackgroundImage>
      <div className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto pt-16 gap-4">
        <h1 className="text-2xl font-serif font-bold text-primary relative
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
          after:absolute after:inset-0 after:-z-10 after:translate-y-[2px] after:text-black/50 after:blur-sm"
        >
          ClarityQuest
        </h1>
        <p className="text-base md:text-lg text-primary relative text-center
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
          after:absolute after:inset-0 after:-z-10 after:translate-y-[2px] after:text-black/50 after:blur-sm"
        >
          Unlock the power of your mind.
          <br />
          Visualize with purpose.
        </p>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-6 my-auto">
        <button
          onClick={() => navigate("/login")}
          className="w-64 py-3 rounded-xl bg-gradient-to-b from-primary/90 to-primary text-primary-foreground font-medium text-lg uppercase
            shadow-[0_0_20px_rgba(255,184,0,0.3)] relative overflow-hidden
            border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
            after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
            transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
            hover:shadow-[0_0_30px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
        >
          <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Get Started</span>
        </button>
        
        <button
          onClick={() => navigate("/science")}
          className="w-64 py-3 rounded-xl bg-gradient-to-b from-primary/90 to-primary text-primary-foreground font-medium text-lg uppercase
            shadow-[0_0_20px_rgba(255,184,0,0.3)] relative overflow-hidden
            border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
            after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
            transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
            hover:shadow-[0_0_30px_rgba(255,184,0,0.5)] hover:scale-[1.02]"
        >
          <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">The Science</span>
        </button>
      </div>

      <div 
        className={`glass rounded-lg p-3 max-w-[280px] transition-all duration-500 transform ${
          isEntering 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <p className="text-sm text-foreground/70">
          <span className="text-primary font-medium">
            {notifications[currentNotificationIndex].name} from {notifications[currentNotificationIndex].state}
          </span>{" "}
          just completed a visualization session
        </p>
      </div>
    </BackgroundImage>
  );
};

export default HomePage;
