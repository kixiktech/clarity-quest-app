
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Lightbulb } from "lucide-react";

interface UserResponse {
  id: string;
  category: string;
  response: string;
  created_at: string;
  updated_at: string;
}

const getCategoryDisplayName = (category: string): string => {
  const displayNames: Record<string, string> = {
    "career": "Career & Purpose",
    "finances": "Money & Finances",
    "relationships": "Friends & Family",
    "health": "Health & Wellness",
    "confidence": "Confidence & Self-Worth",
    "personal-growth": "Personal Growth & Mindset"
  };
  
  return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
};

const getCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    "career": "Your vision for your ideal career, purpose, and professional life.",
    "finances": "Your goals related to money, financial freedom, and abundance.",
    "relationships": "Your vision for meaningful connections with friends and family.",
    "health": "Your aspirations for physical wellbeing, energy, and vitality.",
    "confidence": "Your goals for building unshakeable confidence and self-worth.",
    "personal-growth": "Your vision for personal development and mindset transformation."
  };
  
  return descriptions[category] || "Your goals and aspirations for this area of life.";
};

const EditCategoryPage: FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [response, setResponse] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [responseText, setResponseText] = useState("");

  // Effect to scroll to top of page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (category) {
      fetchCategoryResponse(category);
    }
  }, [category]);

  const fetchCategoryResponse = async (categoryId: string) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to edit your responses",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("user_responses")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", categoryId)
        .single();

      if (error) {
        console.error("Error fetching response:", error);
        toast({
          title: "Error",
          description: "Failed to load your response",
          variant: "destructive",
        });
        return;
      }

      setResponse(data);
      setResponseText(data.response);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!response) return;
    
    try {
      setIsSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to update your response",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("user_responses")
        .update({ 
          response: responseText,
          updated_at: new Date().toISOString()
        })
        .eq("id", response.id)
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your response has been updated",
      });
      
      navigate("/settings");
    } catch (error) {
      console.error("Error updating response:", error);
      toast({
        title: "Error",
        description: "Failed to update your response",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate("/settings")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Edit {category && getCategoryDisplayName(category)}</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <p className="text-muted-foreground">Loading your response...</p>
          </div>
        ) : response ? (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-3">{getCategoryDisplayName(response.category)}</h2>
              <p className="text-muted-foreground mb-4">{getCategoryDescription(response.category)}</p>
              
              <div className="bg-primary/5 rounded-lg p-4 mb-6 flex items-start gap-3 border border-primary/20">
                <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/90">
                  The more detailed and specific you are about your vision, the more effective your personalized sessions will be, 
                  significantly increasing your chances of achieving your goals.
                </p>
              </div>
              
              <Textarea
                className="min-h-[300px] p-4 text-base leading-relaxed mb-4"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder={`Describe your ${response.category} goals and aspirations...`}
              />
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving || responseText === response.response}
                  className="gap-2"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                  <Save className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {new Date(response.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg p-6 shadow-sm text-center">
            <p>No response found for this category. Please go back and try again.</p>
            <Button
              className="mt-4"
              onClick={() => navigate("/settings")}
            >
              Back to Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCategoryPage;
