
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

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) return <div>Loading...</div>;
    if (!session) return <Navigate to="/login" replace />;
    return children;
  };

  // Public route component that redirects to intro questions if logged in
  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) return <div>Loading...</div>;
    if (session) return <Navigate to="/intro-questions" replace />;
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
              <Route path="/intro-questions" element={<ProtectedRoute><IntroQuestionsPage /></ProtectedRoute>} />
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
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
