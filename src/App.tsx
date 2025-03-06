
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
import EditCategoryPage from "./pages/EditCategoryPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PaywallPage from "./pages/PaywallPage";
import ShareEarnPage from "./pages/ShareEarnPage";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [cookieConsentShown, setCookieConsentShown] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie-consent');
    setCookieConsentShown(!!consentGiven);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session) {
        const createdAt = new Date(session.user.created_at);
        const now = new Date();
        setIsNewUser(now.getTime() - createdAt.getTime() < 60000);
        
        const expiresAt = session.expires_at;
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const timeToExpiry = expiresAt - nowInSeconds;
        
        if (timeToExpiry < 86400) {
          supabase.auth.refreshSession();
        }
      }
      
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        
        if (event === 'SIGNED_IN') {
          const createdAt = new Date(session?.user.created_at || '');
          const now = new Date();
          setIsNewUser(now.getTime() - createdAt.getTime() < 60000);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleCookieConsent = () => {
    localStorage.setItem('cookie-consent', 'true');
    setCookieConsentShown(true);
  };

  const ProtectedRoute = ({ children, isIntroRoute = false }: { children: JSX.Element, isIntroRoute?: boolean }) => {
    if (loading) return <div>Loading...</div>;
    if (!session) return <Navigate to="/login" replace />;
    
    if (isNewUser && !isIntroRoute) return <Navigate to="/intro-questions" replace />;
    
    if (!isNewUser && isIntroRoute) return <Navigate to="/session-categories" replace />;
    
    return children;
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) return <div>Loading...</div>;
    if (session) {
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
              <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/science" element={<PublicRoute><SciencePage /></PublicRoute>} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/paywall" element={<ProtectedRoute><PaywallPage /></ProtectedRoute>} />
              <Route path="/share-earn" element={<ProtectedRoute><ShareEarnPage /></ProtectedRoute>} />
              
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
              <Route path="/edit-category/:category" element={<ProtectedRoute><EditCategoryPage /></ProtectedRoute>} />
              
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
