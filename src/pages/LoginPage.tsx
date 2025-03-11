import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Facebook, X, Eye, EyeOff, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import countries from "@/lib/countries";
import { Icons } from "@/components/Icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
}

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [signupForm, setSignupForm] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get("mode");
    const ref = searchParams.get("ref");
    if (mode === "signup") setIsSignUp(true);
    if (ref) {
      setReferralCode(ref);
      console.log("Referral code detected:", ref);
    }
  }, [location]);

  const processReferral = async (userId: string) => {
    if (!referralCode) return;
    try {
      const { data, error } = await supabase.functions.invoke("process-referral", {
        body: { referralCode, newUserId: userId },
      });
      if (error) throw error;
      console.log("Referral processed successfully:", data);
      toast({
        title: "Bonus Sessions Added!",
        description: "You've received 2 free sessions from a referral!",
      });
    } catch (err) {
      console.error("Error in referral processing:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await processReferral(data.user.id);
        const createdAt = new Date(data.user.created_at);
        const now = new Date();
        const isNewUser = now.getTime() - createdAt.getTime() < 60000;
        navigate(isNewUser ? "/intro-questions" : "/session-categories");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    if (signupForm.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            full_name: signupForm.fullName,
            country: signupForm.country,
            gender: signupForm.gender,
          },
        },
      });
      if (error) throw error;
      if (data.user) {
        await processReferral(data.user.id);
        navigate("/intro-questions");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Signup failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/session-categories` },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Google sign-in failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: { redirectTo: `${window.location.origin}/session-categories` },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Facebook sign-in failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#1A1F2C] flex items-center justify-center px-4 py-6 relative overflow-y-auto">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Top navigation */}
      <div className="fixed top-2 left-4 right-4 flex justify-between items-center z-10">
        <button
          onClick={() => navigate("/")}
          className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        {isSignUp && (
          <Button
            onClick={() => navigate("/intro-questions")}
            className="gap-2 text-white/70 hover:text-white transition-colors flex items-center text-sm py-1 bg-transparent hover:bg-transparent"
          >
            Skip for now
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main form container */}
      <div className="w-full max-w-[320px] bg-black/30 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 relative z-10 mt-10">
        <h1 className="text-xl font-semibold text-white mb-3 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>

        {isSignUp ? (
          <form className="space-y-2" onSubmit={handleSignup}>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={signupForm.fullName}
              onChange={handleSignupFormChange}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={signupForm.email}
              onChange={handleSignupFormChange}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={signupForm.password}
                onChange={handleSignupFormChange}
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-white/50" /> : <Eye className="h-4 w-4 text-white/50" />}
              </button>
            </div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={signupForm.confirmPassword}
                onChange={handleSignupFormChange}
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-white/50" /> : <Eye className="h-4 w-4 text-white/50" />}
              </button>
            </div>
            <Select
              value={signupForm.country}
              onValueChange={(value) => setSignupForm((prev) => ({ ...prev, country: value }))}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white h-8">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] bg-black/90 text-white border-white/20">
                <SelectGroup>
                  {countries.map((country) => (
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
                        onClick={(e) => {
                          e.preventDefault();
                          setShowTooltip(!showTooltip);
                        }}
                      >
                        <span className="h-4 w-4 text-white/50 rounded-full bg-white/20 flex items-center justify-center text-xs">?</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={5}
                      className="bg-white text-black p-3 rounded-md shadow-lg max-w-[200px] text-sm z-[9999]"
                    >
                      <p>We use this to personalize your experience.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex space-x-2">
                <Toggle
                  pressed={signupForm.gender === "male"}
                  onPressedChange={() => setSignupForm((prev) => ({ ...prev, gender: "male" }))}
                  disabled={isLoading}
                  className={`px-2 py-0.5 rounded-md text-sm ${
                    signupForm.gender === "male" ? "bg-primary text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Male
                </Toggle>
                <Toggle
                  pressed={signupForm.gender === "female"}
                  onPressedChange={() => setSignupForm((prev) => ({ ...prev, gender: "female" }))}
                  disabled={isLoading}
                  className={`px-2 py-0.5 rounded-md text-sm ${
                    signupForm.gender === "female" ? "bg-primary text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Female
                </Toggle>
              </div>
            </div>
            <Button type="submit" className="w-full h-8" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        ) : (
          <form className="space-y-2" onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-white/50" /> : <Eye className="h-4 w-4 text-white/50" />}
              </button>
            </div>
            <Button type="submit" className="w-full h-8" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        )}

        {/* Social login buttons */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1A1F2C] text-white/50 px-2">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 h-7 w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 h-7 w-full"
            onClick={handleFacebookSignIn}
            disabled={isLoading}
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 h-7 w-full"
            onClick={() => {}}
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Toggle between login/signup */}
        <p className="mt-3 text-center text-xs text-white/50">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setSignupForm({ fullName: "", email: "", password: "", confirmPassword: "", country: "", gender: "" });
              setEmail("");
              setPassword("");
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