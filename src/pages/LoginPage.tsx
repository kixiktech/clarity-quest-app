import { FC, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "@/lib/countries";
import { Facebook, X, ArrowLeft, ArrowRight, Eye, EyeOff, Search } from "lucide-react";

interface LoginPageProps {
  className?: string;
}

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender: string;
}

const LoginPage: FC<LoginPageProps> = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const [signupForm, setSignupForm] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
  });
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferralCode(ref);
      console.log("Referral code detected:", ref);
    }
  }, []);

  const processReferral = async (userId: string) => {
    if (!referralCode) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('process-referral', {
        body: {
          referralCode,
          newUserId: userId
        }
      });
      
      if (error) {
        console.error("Error processing referral:", error);
        return;
      }
      
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        await processReferral(data.user.id);
        
        const createdAt = new Date(data.user.created_at);
        const now = new Date();
        const isNewUser = now.getTime() - createdAt.getTime() < 60000;

        if (isNewUser) {
          navigate("/intro-questions");
        } else {
          navigate("/session-categories");
        }
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

  const handleSignupFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

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
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/session-categories`,
        },
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Google sign in failed. Please try again.",
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
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/session-categories`,
        },
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Facebook sign in failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mode = searchParams.get("mode");
  const isSignupMode = mode === "signup";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e1a2e] py-12 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-white">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Link>
          
          {isSignupMode && (
            <Link to="/login" className="flex items-center text-white bg-[#FFD700] hover:bg-yellow-500 px-4 py-2 rounded-full">
              <span>Skip for now</span>
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          )}
        </div>
        
        <div className="bg-[#272334] rounded-3xl p-8 shadow-xl">
          <h2 className="text-center text-2xl font-mono font-bold text-white mb-6">
            {isSignupMode ? "Create Account" : "Log In"}
          </h2>
          
          {isSignupMode ? (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={signupForm.fullName}
                  onChange={handleSignupFormChange}
                  placeholder="Full Name"
                  disabled={isLoading}
                  className="bg-[#333144] border-none text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signupForm.email}
                  onChange={handleSignupFormChange}
                  placeholder="Email"
                  disabled={isLoading}
                  className="bg-[#333144] border-none text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={signupForm.password}
                  onChange={handleSignupFormChange}
                  placeholder="Password"
                  disabled={isLoading}
                  className="bg-[#333144] border-none text-white pr-10 placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={signupForm.confirmPassword}
                  onChange={handleSignupFormChange}
                  placeholder="Confirm Password"
                  disabled={isLoading}
                  className="bg-[#333144] border-none text-white pr-10 placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              <div>
                <Select
                  value={signupForm.country}
                  onValueChange={(value) => handleSelectChange("country", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="bg-[#333144] border-none text-white">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80 bg-[#333144] text-white">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <Label htmlFor="gender" className="text-white">Gender</Label>
                  <div className="ml-2 rounded-full bg-gray-600 w-5 h-5 flex items-center justify-center text-white text-xs">?</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "bg-[#333144] border-none hover:bg-[#4a4658]",
                      signupForm.gender === "male" ? "bg-[#4a4658] text-white" : "text-gray-400"
                    )}
                    onClick={() => handleSelectChange("gender", "male")}
                    disabled={isLoading}
                  >
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "bg-[#333144] border-none hover:bg-[#4a4658]",
                      signupForm.gender === "female" ? "bg-[#4a4658] text-white" : "text-gray-400"
                    )}
                    onClick={() => handleSelectChange("gender", "female")}
                    disabled={isLoading}
                  >
                    Female
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-3 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#333144] border-none hover:bg-[#4a4658] text-white"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#333144] border-none hover:bg-[#4a4658] text-white"
                  onClick={handleFacebookSignIn}
                  disabled={isLoading}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#333144] border-none hover:bg-[#4a4658] text-white"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-center text-gray-400 text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-[#FFD700] hover:underline">
                  Log In
                </Link>
              </div>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled={isLoading}
                  className="bg-[#333144] border-none text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  disabled={isLoading}
                  className="bg-[#333144] border-none text-white pr-10 placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember_me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-[#FFD700] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-3 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#333144] border-none hover:bg-[#4a4658] text-white"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#333144] border-none hover:bg-[#4a4658] text-white"
                  onClick={handleFacebookSignIn}
                  disabled={isLoading}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-[#333144] border-none hover:bg-[#4a4658] text-white"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-center text-gray-400 text-sm mt-4">
                Don't have an account?{" "}
                <Link to="/login?mode=signup" className="text-[#FFD700] hover:underline">
                  Sign Up
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
