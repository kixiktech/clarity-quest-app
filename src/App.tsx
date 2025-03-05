
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./integrations/supabase/client";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SciencePage from "./pages/SciencePage";
import NotFound from "./pages/NotFound";
import IntroQuestionsPage from "./pages/IntroQuestionsPage";
import FinancesPage from "./pages/FinancesPage";
import CareerPage from "./pages/CareerPage";
import RelationshipsPage from "./pages/RelationshipsPage";
import PersonalGrowthPage from "./pages/PersonalGrowthPage";
import ConfidencePage from "./pages/ConfidencePage";
import HealthPage from "./pages/HealthPage";
import ProcessingPage from "./pages/ProcessingPage";
import CategoryProcessingPage from "./pages/CategoryProcessingPage";
import SessionCategoriesPage from "./pages/SessionCategoriesPage";
import FocusInputPage from "./pages/FocusInputPage";
import VisualizationPage from "./pages/VisualizationPage";
import SessionFeedbackPage from "./pages/SessionFeedbackPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import SettingsPage from "./pages/SettingsPage";
import CookieConsent from "./components/CookieConsent";

// Configure Supabase to use longer session duration
supabase.auth.setSession({
  refresh_token_rotation_enabled: true,
  access_token_expiration_time: 3600 * 24 * 30, // 30 days
});

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [cookieConsentShown, setCookieConsentShown] = useState(false);

  useEffect(() => {
    // Check if cookie consent was previously given
    const consentGiven = localStorage.getItem('cookie-consent');
    setCookieConsentShown(!!consentGiven);

    // Get initial session with persistence enabled
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // Check if this is a new user by looking at session creation time
      if (session) {
        const createdAt = new Date(session.user.created_at);
        const now = new Date();
        // If the account was created within the last minute, consider it a new user
        setIsNewUser(now.getTime() - createdAt.getTime() < 60000);
        
        // If session is close to expiring, refresh it
        const expiresAt = session.expires_at;
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const timeToExpiry = expiresAt - nowInSeconds;
        
        // If session expires in less than a day, refresh it
        if (timeToExpiry < 86400) {
          supabase.auth.refreshSession();
        }
      }
      
      setLoading(false);
    });

    // Listen for auth changes with enhanced persistence
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        
        // If this is a signup event, mark as new user
        if (event === 'SIGNED_IN') {
          const createdAt = new Date(session?.user.created_at || '');
          const now = new Date();
          setIsNewUser(now.getTime() - createdAt.getTime() < 60000);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Record consent when user accepts cookies
  const handleCookieConsent = () => {
    localStorage.setItem('cookie-consent', 'true');
    setCookieConsentShown(true);
  };

  // Protected route component that redirects based on user status
  const ProtectedRoute = ({ children, isIntroRoute = false }: { children: JSX.Element, isIntroRoute?: boolean }) => {
    if (loading) return <div>Loading...</div>;
    if (!session) return <Navigate to="/login" replace />;
    
    // For new users, direct them to intro questions
    if (isNewUser && !isIntroRoute) return <Navigate to="/intro-questions" replace />;
    
    // For existing users visiting the intro page, redirect to session categories
    if (!isNewUser && isIntroRoute) return <Navigate to="/session-categories" replace />;
    
    return children;
  };

  // Public route component that redirects to relevant page if logged in
  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) return <div>Loading...</div>;
    if (session) {
      // New users go to intro questions, existing users go to session categories
      return isNewUser 
        ? <Navigate to="/intro-questions" replace /> 
        : <Navigate to="/session-categories" replace />;
    }
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/science" element={<PublicRoute><SciencePage /></PublicRoute>} />
              
              {/* Protected routes */}
              <Route path="/intro-questions" element={<ProtectedRoute isIntroRoute={true}><IntroQuestionsPage /></ProtectedRoute>} />
              <Route path="/finances" element={<ProtectedRoute><FinancesPage /></ProtectedRoute>} />
              <Route path="/career" element={<ProtectedRoute><CareerPage /></ProtectedRoute>} />
              <Route path="/relationships" element={<ProtectedRoute><RelationshipsPage /></ProtectedRoute>} />
              <Route path="/personal-growth" element={<ProtectedRoute><PersonalGrowthPage /></ProtectedRoute>} />
              <Route path="/confidence" element={<ProtectedRoute><ConfidencePage /></ProtectedRoute>} />
              <Route path="/health" element={<ProtectedRoute><HealthPage /></ProtectedRoute>} />
              <Route path="/processing" element={<ProtectedRoute><ProcessingPage /></ProtectedRoute>} />
              <Route path="/category-processing" element={<ProtectedRoute><CategoryProcessingPage /></ProtectedRoute>} />
              <Route path="/session-categories" element={<ProtectedRoute><SessionCategoriesPage /></ProtectedRoute>} />
              <Route path="/focus-input" element={<ProtectedRoute><FocusInputPage /></ProtectedRoute>} />
              <Route path="/visualization" element={<ProtectedRoute><VisualizationPage /></ProtectedRoute>} />
              <Route path="/session-feedback" element={<ProtectedRoute><SessionFeedbackPage /></ProtectedRoute>} />
              <Route path="/delete-account" element={<ProtectedRoute><DeleteAccountPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              
              {/* 404 route - make sure this is the last route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          {!cookieConsentShown && <CookieConsent onAccept={handleCookieConsent} />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
