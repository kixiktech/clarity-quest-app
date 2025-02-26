
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { SUBSCRIPTION_PRICES } from "@/lib/stripe";
import { ArrowLeft } from "lucide-react";

interface UserResponse {
  id: string;
  category: string;
  response: string;
  created_at: string;
  updated_at: string;
}

const SettingsPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const subscription = useSubscription();

  useEffect(() => {
    fetchUserResponses();
  }, []);

  const fetchUserResponses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to view your settings",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("user_responses")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      setResponses(data || []);
    } catch (error) {
      console.error("Error fetching responses:", error);
      toast({
        title: "Error",
        description: "Failed to load your responses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscription = async (priceId: string) => {
    try {
      setIsProcessing(true);
      const response = await fetch(
        'https://mndwifizvvmscndzzhxv.supabase.co/functions/v1/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ priceId }),
        }
      );

      const { sessionUrl, error } = await response.json();
      if (error) throw new Error(error);
      
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateResponse = async (id: string, newResponse: string) => {
    try {
      const { error } = await supabase
        .from("user_responses")
        .update({ response: newResponse })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your response has been updated",
      });
      
      fetchUserResponses();
    } catch (error) {
      console.error("Error updating response:", error);
      toast({
        title: "Error",
        description: "Failed to update your response",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        </div>

        <div className="space-y-8">
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Subscription</h2>
            <div className="space-y-4">
              <p>Current plan: <span className="font-medium capitalize">{subscription.plan}</span></p>
              <p>Credits remaining: {subscription.credits}</p>
              <p>Referral credits: {subscription.referralCredits}</p>
              
              {!subscription.isSubscribed && (
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button
                    onClick={() => handleSubscription(SUBSCRIPTION_PRICES.monthly.id)}
                    disabled={isProcessing}
                  >
                    Subscribe Monthly (${SUBSCRIPTION_PRICES.monthly.amount / 100})
                  </Button>
                  <Button
                    onClick={() => handleSubscription(SUBSCRIPTION_PRICES.annual.id)}
                    disabled={isProcessing}
                  >
                    Subscribe Annually (${SUBSCRIPTION_PRICES.annual.amount / 100})
                  </Button>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Your Previous Responses</h2>
            {isLoading ? (
              <p className="text-muted-foreground">Loading your responses...</p>
            ) : responses.length === 0 ? (
              <p className="text-muted-foreground">No responses found. Complete the onboarding to see your responses here.</p>
            ) : (
              <div className="space-y-6">
                {responses.map((response) => (
                  <div key={response.id} className="bg-card rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-2 capitalize">{response.category}</h3>
                    <textarea
                      className="w-full min-h-[100px] p-3 rounded-md bg-background border resize-y"
                      defaultValue={response.response}
                      onBlur={(e) => {
                        if (e.target.value !== response.response) {
                          handleUpdateResponse(response.id, e.target.value);
                        }
                      }}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Last updated: {new Date(response.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
