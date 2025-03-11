import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Spline from '@splinetool/react-spline';
import Footer from "../components/Footer";

const notifications = [
  {
    name: "John",
    country: "United States"
  }, {
    name: "Michael",
    country: "United States"
  }, {
    name: "Emma",
    country: "United States"
  }, {
    name: "Hiroshi",
    country: "Japan"
  }, {
    name: "Wei",
    country: "China"
  }, {
    name: "Liam",
    country: "United States"
  }, {
    name: "Sophia",
    country: "Germany"
  }, {
    name: "William",
    country: "United States"
  }, {
    name: "Arjun",
    country: "India"
  }, {
    name: "Lucas",
    country: "France"
  }, {
    name: "Kim",
    country: "South Korea"
  }, {
    name: "Alexander",
    country: "United States"
  }, {
    name: "Mia",
    country: "United States"
  }, {
    name: "Sebastian",
    country: "Sweden"
  }, {
    name: "Felipe",
    country: "Brazil"
  }, {
    name: "Isabella",
    country: "United States"
  }, {
    name: "Jack",
    country: "United States"
  }, {
    name: "Harper",
    country: "Netherlands"
  }, {
    name: "Noah",
    country: "United States"
  }, {
    name: "Daniel",
    country: "Germany"
  }, {
    name: "Johan",
    country: "Norway"
  }, {
    name: "Mateo",
    country: "Spain"
  }, {
    name: "Mats",
    country: "Denmark"
  }, {
    name: "Angelo",
    country: "Italy"
  }, {
    name: "Aiden",
    country: "United States"
  }, {
    name: "Ethan",
    country: "United States"
  }, {
    name: "Madison",
    country: "Australia"
  }, {
    name: "Viktor",
    country: "Switzerland"
  }, {
    name: "Rafael",
    country: "Portugal"
  }, {
    name: "Elijah",
    country: "United States"
  }, {
    name: "Tariq",
    country: "Pakistan"
  }, {
    name: "Logan",
    country: "United States"
  }, {
    name: "Grace",
    country: "United States"
  }, {
    name: "David",
    country: "Canada"
  }, {
    name: "Mikhail",
    country: "Russia"
  }, {
    name: "Santiago",
    country: "Chile"
  }, {
    name: "Hugo",
    country: "Belgium"
  }, {
    name: "Jakob",
    country: "Czech Republic"
  }, {
    name: "Joseph",
    country: "United States"
  }, {
    name: "Victoria",
    country: "United States"
  }, {
    name: "Lily",
    country: "South Africa"
  }, {
    name: "Elias",
    country: "Finland"
  }, {
    name: "Nguyen",
    country: "Vietnam"
  }, {
    name: "Juan",
    country: "Mexico"
  }, {
    name: "Emir",
    country: "Malaysia"
  }, {
    name: "Omar",
    country: "United Arab Emirates"
  }, {
    name: "Amadou",
    country: "Nigeria"
  },{
    name: "Jorge",
    country: "Colombia"
  },  {
    name: "Diego",
    country: "Argentina"
  }
];

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsEntering(false);
      setTimeout(() => {
        setCurrentNotificationIndex(prev => (prev + 1) % notifications.length);
        setIsEntering(true);
      }, 1200);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleGetStarted = () => {
    navigate("/login?mode=signup");
  };

  return (
    <BackgroundImage>
      <div className="flex flex-col min-h-[100dvh]">
        <div className="flex flex-col items-center justify-start w-full pt-4 sm:pt-6 md:pt-8 px-4">
          <img 
            src="/lovable-uploads/d923baf7-78e1-40d3-9b06-3741979d91d1.png" 
            alt="ClarityQuest" 
            className="w-[180px] sm:w-[220px] md:w-[260px] h-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" 
          />
          
          <div className="text-white text-center mt-2 sm:mt-3 space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg md:text-xl">Hack your Brain.</p>
            <p className="text-base sm:text-lg md:text-xl">Unlock the full potential of your mind.</p>
            <p className="text-base sm:text-lg md:text-xl">Visualize with purpose.</p>
          </div>
        </div>

        <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto pt-6 pb-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[21/9]">
            <Spline 
              scene="https://prod.spline.design/MC6pPkuT016z7SsZ/scene.splinecode" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div 
              className="absolute -inset-4 pointer-events-none" 
              style={{
                background: "radial-gradient(circle, transparent 30%, #221737 70%)"
              }} 
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-4 sm:gap-6 px-4 pb-8">
          <button onClick={handleGetStarted} className="w-[240px] sm:w-64 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium text-base sm:text-lg uppercase
              shadow-[0_0_20px_rgba(245,158,11,0.4)] relative overflow-hidden
              border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
              before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
              after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
              transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
              hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.02]">
            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">GET STARTED for free</span>
          </button>
          
          <button onClick={() => navigate("/science")} className="w-[240px] sm:w-64 py-2.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium text-base sm:text-lg uppercase
              shadow-[0_0_20px_rgba(245,158,11,0.4)] relative overflow-hidden
              border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
              before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
              after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
              transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
              hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.02]">
            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">The Science</span>
          </button>
        </div>

        <div className="w-full px-4 py-12 bg-black/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl text-primary font-semibold text-center mb-8">Unlock Your Mind's Potential</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="glass p-5 rounded-lg">
                <h3 className="text-xl text-white mb-2">Mental Clarity</h3>
                <p className="text-white/70">Sharpen your focus and reduce mental fog through guided visualization exercises.</p>
              </div>
              
              <div className="glass p-5 rounded-lg">
                <h3 className="text-xl text-white mb-2">Goal Achievement</h3>
                <p className="text-white/70">Program your mind to recognize and capitalize on opportunities aligned with your goals.</p>
              </div>
              
              <div className="glass p-5 rounded-lg">
                <h3 className="text-xl text-white mb-2">Stress Reduction</h3>
                <p className="text-white/70">Learn techniques to calm your mind and reduce anxiety through targeted visualization.</p>
              </div>
              
              <div className="glass p-5 rounded-lg">
                <h3 className="text-xl text-white mb-2">Improved Focus</h3>
                <p className="text-white/70">Train your brain to maintain deep concentration despite distractions.</p>
              </div>
              
              <div className="glass p-5 rounded-lg">
                <h3 className="text-xl text-white mb-2">Enhanced Creativity</h3>
                <p className="text-white/70">Tap into your creative potential by expanding your mind's visual capabilities.</p>
              </div>
              
              <div className="glass p-5 rounded-lg">
                <h3 className="text-xl text-white mb-2">Better Sleep</h3>
                <p className="text-white/70">Develop pre-sleep visualization routines for deeper, more restorative rest.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl text-primary font-semibold text-center mb-8">How ClarityQuest Works</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">1</div>
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-2">Sign Up</h3>
                  <p className="text-white/70">Create your account and complete a brief onboarding questionnaire to personalize your experience.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">2</div>
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-2">Select a Focus Area</h3>
                  <p className="text-white/70">Choose from categories like Career, Relationships, Health, or Personal Growth to target your visualization.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">3</div>
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-2">Personalized Guidance</h3>
                  <p className="text-white/70">Follow our scientifically-designed visualization exercises tailored to your specific goals.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">4</div>
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-2">Track Progress</h3>
                  <p className="text-white/70">Monitor your improvement and receive insights on how to enhance your visualization practice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-12 bg-black/30 backdrop-blur-sm">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl text-white font-semibold mb-4">Ready to Transform Your Mind?</h2>
            <p className="text-white/70 mb-6">Join thousands who are already enhancing their lives through the power of scientific visualization.</p>
            
            <button onClick={handleGetStarted} className="w-[240px] sm:w-64 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium text-base sm:text-lg uppercase
                shadow-[0_0_20px_rgba(245,158,11,0.4)] relative overflow-hidden
                border-2 border-t-white/30 border-l-white/30 border-r-black/30 border-b-black/30
                before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-xl
                after:absolute after:inset-0 after:-z-10 after:translate-y-[3px] after:bg-black/50 after:blur-sm after:rounded-xl
                transform active:translate-y-[2px] active:after:translate-y-[1px] transition-all duration-100
                hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.02]">
              <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">START NOW</span>
            </button>
          </div>
        </div>

        <Footer className="mt-auto" />

        <div 
          className="fixed bottom-4 sm:bottom-8 left-1/2 glass rounded-lg p-2 sm:p-3 w-[240px] sm:w-64"
          style={{
            transform: `translate(${isEntering ? '-50%, 0' : '120%, 0'}) scale(${isEntering ? '1' : '0.95'})`,
            transition: 'all 1200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            opacity: isEntering ? 1 : 0,
            visibility: isEntering ? 'visible' : 'hidden',
          }}
        >
          <p className="text-xs sm:text-sm text-foreground/70 text-center">
            <span className="text-primary font-medium">
              {notifications[currentNotificationIndex].name} from {notifications[currentNotificationIndex].country}
            </span>
            <br />
            just completed a visualization session
          </p>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default HomePage;
