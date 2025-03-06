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

interface LoginPageProps {
  className?: string;
}

const LoginPage: FC<LoginPageProps> = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a referral code in the URL
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
      // Call the Supabase Edge Function to process the referral
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
      
      // Show success toast
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
        // Process referral if there's a code
        await processReferral(data.user.id);
        
        // Redirect based on whether the user is new or existing
        const createdAt = new Date(data.user.created_at);
        const now = new Date();
        const isNewUser = now.getTime() - createdAt.getTime() < 60000; // Adjust time as needed

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: email.split('@')[0], // Default full name from email
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
        // Process referral if there's a code
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

  const mode = searchParams.get("mode");
  const isSignupMode = mode === "signup";

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-background py-12",
        className
      )}
    >
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignupMode ? "Create an account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              to={isSignupMode ? "/login" : "/login?mode=signup"}
              className="text-primary hover:underline"
            >
              {isSignupMode ? "login" : "create an account"}
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={isSignupMode ? handleSignup : handleLogin}
            >
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-1">
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
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={isLoading}
                  />
                </div>
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
                  <Label htmlFor="remember_me" className="ml-2 block text-sm">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Loading ...
                    </>
                  ) : (
                    <>
                      {isSignupMode ? "Sign up" : "Sign in"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
