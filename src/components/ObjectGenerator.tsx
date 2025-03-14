import { FC, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { CategoryType } from '@/utils/categoryMapping';

// Define types for our responses
interface UserResponse {
  id: string;
  user_id: string;
  category: CategoryType;
  response: string;
  created_at: string;
}

interface UserResponseHistory {
  userId: string;
  responses: {
    career: string | null;
    finances: string | null;
    'personal-growth': string | null;
    confidence: string | null;
    health: string | null;
    relationships: string | null;
    focus: string | null;
  };
}

// Cache responses in memory
let responseCache: { [userId: string]: { responses: UserResponseHistory; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchUserResponses(): Promise<UserResponseHistory | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Check cache
    const cachedData = responseCache[user.id];
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log("📦 Using cached responses");
      return cachedData.responses;
    }

    console.log("🔄 Fetching fresh responses");
    const { data, error } = await supabase
      .from('user_responses')
      .select('category, response')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return null;
    }

    const responses = {
      career: null,
      finances: null,
      'personal-growth': null,
      confidence: null,
      health: null,
      relationships: null,
      focus: null,
    };

    // Use a Set to track processed categories
    const processedCategories = new Set<string>();
    
    data?.forEach((response: UserResponse) => {
      // Only take the most recent response for each category
      if (!processedCategories.has(response.category)) {
        responses[response.category] = response.response;
        processedCategories.add(response.category);
      }
    });

    const responseHistory = { userId: user.id, responses };
    
    // Update cache
    responseCache[user.id] = {
      responses: responseHistory,
      timestamp: Date.now()
    };

    return responseHistory;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Clear cache when component unmounts
function clearResponseCache(userId?: string) {
  if (userId) {
    delete responseCache[userId];
  } else {
    responseCache = {};
  }
}

const GuidedMeditationGenerator: FC = () => {
  const [userHistory, setUserHistory] = useState<UserResponseHistory | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Clear cache when component unmounts
      if (user?.id) {
        clearResponseCache(user.id);
      }
    };
  }, [user?.id]);

  // Check authentication status and fetch user data
  useEffect(() => {
    async function initializeAuth() {
      try {
        // Get initial auth state
        const { data: { user: initialUser } } = await supabase.auth.getUser();
        setUser(initialUser);

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth error:', error);
        setError('Authentication failed');
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, []);

  // Fetch user responses when user is authenticated
  useEffect(() => {
    async function loadUserResponses() {
      if (!user) return;
      
      try {
        setLoading(true);
        const responses = await fetchUserResponses();
        setUserHistory(responses);
        if (responses) {
          console.log(responses.userId);
          console.log(responses.responses);
        }
      } catch (error) {
        console.error('Error loading responses:', error);
        setError('Failed to load responses');
      } finally {
        setLoading(false);
      }
    }

    loadUserResponses();
  }, [user]);

  const getLatestResponse = (category: CategoryType) => {
    return userHistory?.responses[category] || null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your meditation history.</div>;
  }

  return (
    <div>
      {/* Your component JSX */}
      {/* Example of how to display responses: */}
      <div>
        {Object.entries(userHistory?.responses || {}).map(([category, response]) => (
          response && (
            <div key={category}>
              <h3>{category}</h3>
              <p>{response}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default GuidedMeditationGenerator;
export { fetchUserResponses, clearResponseCache };

