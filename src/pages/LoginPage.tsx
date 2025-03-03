
import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  // Extract referral code from URL if present or from sessionStorage
  const queryParams = new URLSearchParams(location.search);
  const referralCodeFromUrl = queryParams.get('ref');
  const referralCodeFromStorage = sessionStorage.getItem('referralCode');
  const referralCode = referralCodeFromUrl || referralCodeFromStorage;
  
  // Set initial tab based on mode parameter
  useEffect(() => {
    const mode = queryParams.get('mode');
    if (mode === 'signup') {
      setActiveTab('signup');
    }
  }, [queryParams]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Process referral if referral code exists
      if (referralCode && data.user) {
        try {
          const response = await supabase.functions.invoke('process-referral', {
            body: {
              referralCode: referralCode,
              userId: data.user.id
            }
          });
          
          if (response.error) {
            console.error("Error processing referral:", response.error);
          } else {
            toast({
              title: "Referral bonus added!",
              description: "You've been credited with a free session.",
            });
          }
        } catch (refError) {
          console.error("Error processing referral:", refError);
        }
      }

      toast({
        title: "Check your email",
        description: "We sent you a confirmation link",
      });
      
      // Redirect to home page after signup
      navigate("/");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Process referral if referral code exists
      if (referralCode && data.user) {
        try {
          const response = await supabase.functions.invoke('process-referral', {
            body: {
              referralCode: referralCode,
              userId: data.user.id
            }
          });
          
          if (response.error) {
            console.error("Error processing referral:", response.error);
          } else {
            toast({
              title: "Referral bonus added!",
              description: "You've been credited with a free session.",
            });
          }
        } catch (refError) {
          console.error("Error processing referral:", refError);
        }
      }

      // Redirect to home page after login
      navigate("/");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center">
      <div className="mb-6 w-full flex justify-start">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="text-primary-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="w-full max-w-md mx-auto space-y-6 mt-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary-foreground">Welcome to MindQuest</h1>
          <p className="text-primary-foreground/70">
            {referralCode ? "You've been invited! Sign up to claim your free session." : "Sign in to access your account"}
          </p>
        </div>
        
        <Tabs 
          defaultValue={referralCode ? "signup" : "login"} 
          className="w-full"
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <Button 
              className="w-full button-shine bg-primary text-primary-foreground"
              disabled={isLoading}
              onClick={handleSignIn}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <Button 
              className="w-full button-shine bg-primary text-primary-foreground"
              disabled={isLoading}
              onClick={handleSignUp}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
            
            {referralCode && (
              <div className="bg-primary/10 p-3 rounded-md border border-primary/20">
                <p className="text-sm text-primary-foreground/80">
                  You've been invited! Sign up to receive a free session credit.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
