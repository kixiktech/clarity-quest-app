
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // Add console log to debug image loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => console.log('Image loaded successfully');
    img.onerror = () => console.log('Error loading image');
    img.src = '/lovable-uploads/db111871-da77-42f2-86fb-a2a2e45ac78b.png';
  }, []);

  return (
    <div 
      className="min-h-screen w-full bg-[url('/lovable-uploads/db111871-da77-42f2-86fb-a2a2e45ac78b.png')] bg-cover bg-center bg-no-repeat bg-fixed flex flex-col items-center justify-center px-8 relative"
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <button
          onClick={() => navigate("/login")}
          className="w-64 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg uppercase relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
            before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
            after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
            after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
            hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Get Started</span>
        </button>
        <button
          onClick={() => navigate("/science")}
          className="w-64 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg uppercase relative overflow-hidden group
            hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.6)] transition-all duration-300 ease-out
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/25 before:to-primary/0 
            before:translate-x-[-150%] before:transition-transform before:duration-500 hover:before:translate-x-[150%]
            after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_15px_rgba(255,184,0,0.5),inset_0_0_15px_rgba(255,184,0,0.5)] 
            after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
            hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">The Science</span>
        </button>
      </div>

      <div 
        className={`glass rounded-lg p-4 max-w-[280px] mb-8 transition-all duration-500 transform ${
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
    </div>
  );
};

export default HomePage;
