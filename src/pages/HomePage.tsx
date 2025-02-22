import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";

const notifications = [
  { name: "John", country: "United States" },
  { name: "Michael", country: "United States" },
  { name: "Emma", country: "United States" },
  { name: "Hiroshi", country: "Japan" },
  { name: "Wei", country: "China" },
  { name: "Liam", country: "United States" },
  { name: "Sophia", country: "Germany" },
  { name: "William", country: "United States" },
  { name: "Arjun", country: "India" },
  { name: "Lucas", country: "France" },
  { name: "Kim", country: "South Korea" },
  { name: "Alexander", country: "United States" },
  { name: "Mia", country: "United States" },
  { name: "Sebastian", country: "Sweden" },
  { name: "Felipe", country: "Brazil" },
  { name: "Isabella", country: "United States" },
  { name: "Jack", country: "United States" },
  { name: "Harper", country: "Netherlands" },
  { name: "Noah", country: "United States" },
  { name: "Daniel", country: "Germany" },
  { name: "Johan", country: "Norway" },
  { name: "Mateo", country: "Spain" },
  { name: "Mats", country: "Denmark" },
  { name: "Angelo", country: "Italy" },
  { name: "Aiden", country: "United States" },
  { name: "Ethan", country: "United States" },
  { name: "Madison", country: "Australia" },
  { name: "Viktor", country: "Switzerland" },
  { name: "Rafael", country: "Portugal" },
  { name: "Elijah", country: "United States" },
  { name: "Tariq", country: "Pakistan" },
  { name: "Logan", country: "United States" },
  { name: "Grace", country: "United States" },
  { name: "David", country: "Canada" },
  { name: "Mikhail", country: "Russia" },
  { name: "Santiago", country: "Chile" },
  { name: "Hugo", country: "Belgium" },
  { name: "Jakob", country: "Czech Republic" },
  { name: "Joseph", country: "United States" },
  { name: "Victoria", country: "United States" },
  { name: "Lily", country: "South Africa" },
  { name: "Elias", country: "Finland" },
  { name: "Nguyen", country: "Vietnam" },
  { name: "Juan", country: "Mexico" },
  { name: "Emir", country: "Malaysia" },
  { name: "Omar", country: "United Arab Emirates" },
  { name: "Amadou", country: "Nigeria" },
  { name: "Diego", country: "Argentina" }
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
      <div className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto pt-8 sm:pt-16">
        <img 
          src="/lovable-uploads/3d7b9f60-a195-43f0-b963-e6e084999749.png" 
          alt="ClarityQuest"
          className="w-[280px] sm:w-[400px] md:w-[500px] h-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
        />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 -mt-12 sm:-mt-20">
        <button
          onClick={() => navigate("/login")}
          className="w-[240px] sm:w-64 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-base sm:text-lg uppercase
            shadow-[0_0_20px_rgba(14,165,233,0.3)] relative overflow-hidden
            border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
            after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
            transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
            hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02]"
        >
          <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Get Started</span>
        </button>
        
        <button
          onClick={() => navigate("/science")}
          className="w-[240px] sm:w-64 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-base sm:text-lg uppercase
            shadow-[0_0_20px_rgba(14,165,233,0.3)] relative overflow-hidden
            border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
            before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
            after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
            transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
            hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.02]"
        >
          <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">The Science</span>
        </button>
      </div>

      <div 
        className={`fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 glass rounded-lg p-2 sm:p-3 w-[280px] sm:w-64 transition-all duration-500 transform ${
          isEntering 
            ? "translate-y-0 opacity-100" 
            : "translate-y-full opacity-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <p className="text-xs sm:text-sm text-foreground/70">
          <span className="text-primary font-medium">
            {notifications[currentNotificationIndex].name} from {notifications[currentNotificationIndex].country}
          </span>{" "}
          just completed a visualization session
        </p>
      </div>
    </BackgroundImage>
  );
};

export default HomePage;
