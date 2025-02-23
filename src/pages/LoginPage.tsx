
import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Facebook, Github, X, HelpCircle } from "lucide-react";
import countries from "@/lib/countries";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsSignUp(true);
    }
  }, [location]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#1A1F2C] flex items-center justify-center px-4 py-8 relative overflow-y-auto">
      {/* Animated background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation buttons */}
      <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-10">
        <button 
          onClick={() => navigate("/")}
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <Button
          onClick={() => navigate("/intro-questions")}
          className="gap-2 text-white/70 hover:text-white transition-colors flex items-center"
        >
          Skip for now
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Main card */}
      <div className="w-full max-w-sm bg-black/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 relative z-10 mt-16">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {isSignUp && (
            <>
              <Input
                type="text"
                placeholder="Full Name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              <Input
                type="email"
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              <Input
                type="password"
                placeholder="Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between space-x-4 bg-white/10 border border-white/20 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-white">Gender</span>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" onClick={(e) => e.preventDefault()}>
                          <HelpCircle className="h-4 w-4 text-white/50" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5} className="bg-white text-black p-2 rounded-md shadow-lg max-w-[200px] text-sm z-[100]">
                        <p>We use this information to personalize your visualization sessions, ensuring the scenarios and guidance resonate more deeply with your personal journey.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <Toggle
                    pressed={gender === "male"}
                    onPressedChange={() => setGender("male")}
                    className={`px-3 py-1 rounded-md ${
                      gender === "male"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    Male
                  </Toggle>
                  <Toggle
                    pressed={gender === "female"}
                    onPressedChange={() => setGender("female")}
                    className={`px-3 py-1 rounded-md ${
                      gender === "female"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    Female
                  </Toggle>
                </div>
              </div>
            </>
          )}
          
          {!isSignUp && (
            <>
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              <Input
                type="password"
                placeholder="Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </>
          )}

          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Log In"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1A1F2C] text-white/50 px-2">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="bg-white/10 border-white/20">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/20">
            <Facebook className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
