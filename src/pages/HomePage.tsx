
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define our user notifications data
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
  const [showNotification, setShowNotification] = useState(true);
  
  useEffect(() => {
    // Rotate through notifications every 2 seconds
    const intervalId = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentNotificationIndex((prev) => (prev + 1) % notifications.length);
        setShowNotification(true);
      }, 300); // Brief delay before showing next notification
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center px-8 relative">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
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

      <div 
        className={`glass rounded-lg p-4 max-w-[280px] mb-8 transition-opacity duration-300 ${
          showNotification ? "opacity-100" : "opacity-0"
        }`}
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
