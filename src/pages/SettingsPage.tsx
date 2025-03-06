
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Brain, Calendar, Edit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UserResponse {
  id: string;
  category: string;
  response: string;
  created_at: string;
  updated_at: string;
}

interface CategoryStats {
  category: string;
  count: number;
}

interface SessionData {
  date: string;
  category: string;
}

interface UserStreak {
  streak_count: number;
  active_days: boolean[];
  last_active_date: string | null;
}

const CATEGORIES = [
  "career", 
  "finances", 
  "relationships", 
  "health", 
  "confidence", 
  "personal-growth"
];

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

const SettingsPage: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [streakData, setStreakData] = useState<UserStreak>({
    streak_count: 0,
    active_days: [false, false, false, false, false, false, false],
    last_active_date: null
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
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

      // Fetch user responses
      const { data: responseData, error: responseError } = await supabase
        .from("user_responses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (responseError) throw responseError;
      setResponses(responseData || []);

      // Fetch session data to calculate streak and active days
      const { data: sessionData, error: sessionError } = await supabase
        .from("session_feedback")
        .select("created_at, session_category_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (sessionError) throw sessionError;
      
      // Calculate category stats
      const categoryUsageCounts = CATEGORIES.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {} as Record<string, number>);

      // Process session data
      if (sessionData && sessionData.length > 0) {
        // Track sessions by day for the last 7 days
        const now = new Date();
        const activeDaysMap = new Array(7).fill(false);
        const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        
        // Calculate the start date (6 days ago)
        const startDate = new Date();
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        
        sessionData.forEach(session => {
          const sessionDate = new Date(session.created_at);
          
          // Count category usage - assume session_category_id maps to category index
          if (session.session_category_id >= 0 && session.session_category_id < CATEGORIES.length) {
            const category = CATEGORIES[session.session_category_id];
            categoryUsageCounts[category] = (categoryUsageCounts[category] || 0) + 1;
          }
          
          // Check if session is within the last 7 days
          if (sessionDate >= startDate && sessionDate <= now) {
            // Calculate day index (0 = today, 1 = yesterday, etc.)
            const dayDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
            const dayIndex = 6 - dayDiff; // Convert to 0-6 for display (Monday to Sunday)
            
            if (dayIndex >= 0 && dayIndex < 7) {
              activeDaysMap[dayIndex] = true;
            }
          }
        });
        
        // Calculate streak
        let streakCount = 0;
        let streakBroken = false;
        
        // Start from today (index 6) and go backward
        for (let i = 6; i >= 0; i--) {
          if (activeDaysMap[i] && !streakBroken) {
            streakCount++;
          } else if (!activeDaysMap[i]) {
            streakBroken = true;
          }
        }
        
        setStreakData({
          streak_count: streakCount,
          active_days: activeDaysMap,
          last_active_date: sessionData[0]?.created_at || null
        });
      }
      
      // Format category stats for display
      const formattedStats = CATEGORIES.map(category => ({
        category,
        count: categoryUsageCounts[category] || 0
      }));
      
      setCategoryStats(formattedStats);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateResponse = async (id: string, newResponse: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error", 
          description: "User not authenticated",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from("user_responses")
        .update({ response: newResponse, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user.id); // Ensure user can only update their own responses

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your response has been updated",
      });
      
      // Update local state to reflect the change
      setResponses(prev => 
        prev.map(item => item.id === id ? {...item, response: newResponse, updated_at: new Date().toISOString()} : item)
      );
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
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">My Progress & Settings</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <p className="text-muted-foreground">Loading your data...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Brain Streak Visualization */}
            <section className="space-y-4">
              <div className="flex items-center justify-center flex-col">
                <Brain className="h-20 w-20 text-primary mb-3" />
                <h2 className="text-xl font-semibold mb-2">Brain Power Streak: {streakData.streak_count} days</h2>
                <p className="text-muted-foreground text-center mb-4 max-w-lg">
                  Your brain is powering up with each day of visualization! Complete 7 days in a row to fully illuminate your potential.
                </p>
                <div className="w-full max-w-md">
                  <Progress value={(streakData.streak_count / 7) * 100} className="h-6" />
                </div>
              </div>
            </section>

            {/* Weekly Outline */}
            <section className="bg-card rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Weekly Activity</h2>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      streakData.active_days[index] 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                        : "bg-secondary text-muted-foreground"
                    )}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Category Stats */}
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Category Usage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="flex justify-between items-center p-3 bg-background rounded-md border border-border">
                    <span className="font-medium">{getCategoryDisplayName(stat.category)}</span>
                    <span className="text-muted-foreground">Sessions: {stat.count}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* User Responses */}
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Edit className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Your Responses</h2>
              </div>
              
              {responses.length === 0 ? (
                <p className="text-muted-foreground">No responses found. Complete the onboarding to see your responses here.</p>
              ) : (
                <div className="space-y-6">
                  {responses.map((response) => (
                    <div key={response.id} className="bg-background rounded-lg p-4 border border-border">
                      <h3 className="font-medium mb-2 capitalize">{getCategoryDisplayName(response.category)}</h3>
                      <textarea
                        className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background resize-y"
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
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
