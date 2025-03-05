import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Facebook, Github, X, HelpCircle, Eye, EyeOff } from "lucide-react";
import countries from "@/lib/countries";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: ""
  });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsSignUp(true);
    }
  }, [location]);

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Validate all fields for sign up
        if (!formData.fullName.trim()) {
          toast.error("Please enter your full name");
          setIsLoading(false);
          return;
        }
        if (!formData.email) {
          toast.error("Please enter your email address");
          setIsLoading(false);
          return;
        }
        if (!validateEmail(formData.email)) {
          toast.error("Please enter a valid email address");
          setIsLoading(false);
          return;
        }
        if (!formData.password) {
          toast.error("Please enter a password");
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (!formData.country) {
          toast.error("Please select your country");
          setIsLoading(false);
          return;
        }
        if (!gender) {
          toast.error("Please select your gender");
          setIsLoading(false);
          return;
        }

        // Check for referral code in session storage
        const referralCode = sessionStorage.getItem('referralCode');
        
        // Get the metadata ready
        const metadata = { 
          full_name: formData.fullName, 
          country: formData.country, 
          gender 
        };
        
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: metadata,
          }
        });

        if (error) {
          toast.error(error.message);
          console.error("Signup error:", error);
          setIsLoading(false);
          return;
        }

        // Process referral if exists
        if (referralCode) {
          try {
            await supabase.functions.invoke('process-referral', {
              body: { referralCode, newUserId: data.user?.id }
            });
            // Clear the referral code from session storage after processing
            sessionStorage.removeItem('referralCode');
          } catch (refError) {
            console.error("Error processing referral:", refError);
            // Don't block signup if referral processing fails
          }
        }

        toast.success("Signup successful! Please check your email to verify your account.");
        navigate("/intro-questions");
      } else {
        // Login flow
        // Validate login fields
        if (!formData.email) {
          toast.error("Please enter your email address");
          setIsLoading(false);
          return;
        }
        if (!validateEmail(formData.email)) {
          toast.error("Please enter a valid email address");
          setIsLoading(false);
          return;
        }
        if (!formData.password) {
          toast.error("Please enter your password");
          setIsLoading(false);
          return;
        }

        // Sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast.error(error.message);
          console.error("Login error:", error);
          setIsLoading(false);
          return;
        }

        toast.success("Login successful!");
        navigate("/intro-questions");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#1A1F2C] flex items-center justify-center px-4 py-6 relative overflow-y-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="fixed top-2 left-4 right-4 flex justify-between items-center z-10">
        <button onClick={() => navigate("/")} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <Button onClick={() => navigate("/intro-questions")} className="gap-2 text-white/70 hover:text-white transition-colors flex items-center text-sm py-1">
          Skip for now
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="w-full max-w-[320px] bg-black/30 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 relative z-10 mt-10">
        <h1 className="text-xl font-semibold text-white mb-3 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>

        <form className="space-y-2" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <Input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={formData.fullName} 
                onChange={e => setFormData({ ...formData, fullName: e.target.value })} 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8"
              />

              <Input 
                type="email" 
                placeholder="Email" 
                required 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })} 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8"
              />

              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  required 
                  value={formData.password} 
                  onChange={e => setFormData({ ...formData, password: e.target.value })} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-white/50" />
                  ) : (
                    <Eye className="h-4 w-4 text-white/50" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password" 
                  required 
                  value={formData.confirmPassword} 
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-white/50" />
                  ) : (
                    <Eye className="h-4 w-4 text-white/50" />
                  )}
                </button>
              </div>

              <Select required onValueChange={value => setFormData({ ...formData, country: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white h-8">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  <SelectGroup>
                    {countries.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between space-x-4 bg-white/10 border border-white/20 rounded-md p-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-lg">Gender</span>
                  <TooltipProvider>
                    <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                      <TooltipTrigger asChild>
                        <button 
                          type="button" 
                          className="focus:outline-none" 
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowTooltip(!showTooltip);
                          }}
                        >
                          <HelpCircle className="h-4 w-4 text-white/50" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={5} className="bg-white text-black p-3 rounded-md shadow-lg max-w-[200px] text-sm z-[9999] relative" onClick={e => e.stopPropagation()}>
                        <p>We use this information to personalize your visualization sessions, ensuring the scenarios and guidance resonate more deeply with your personal journey.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <Toggle 
                    pressed={gender === "male"} 
                    onPressedChange={() => setGender("male")} 
                    className={`px-2 py-0.5 rounded-md text-sm ${gender === "male" ? "bg-primary text-primary-foreground" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
                  >
                    Male
                  </Toggle>
                  <Toggle 
                    pressed={gender === "female"} 
                    onPressedChange={() => setGender("female")} 
                    className={`px-2 py-0.5 rounded-md text-sm ${gender === "female" ? "bg-primary text-primary-foreground" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
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
                required 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })} 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8"
              />

              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  required 
                  value={formData.password} 
                  onChange={e => setFormData({ ...formData, password: e.target.value })} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-white/50" />
                  ) : (
                    <Eye className="h-4 w-4 text-white/50" />
                  )}
                </button>
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full h-8" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Log In")}
          </Button>
        </form>

        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1A1F2C] text-white/50 px-2">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" type="button" className="bg-white/10 border-white/20 h-7 w-full">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="outline" type="button" className="bg-white/10 border-white/20 h-7 w-full">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" type="button" className="bg-white/10 border-white/20 h-7 w-full">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-white/50">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button 
            type="button" 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                country: ""
              });
              setGender(null);
            }} 
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
