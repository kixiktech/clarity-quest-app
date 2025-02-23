
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/intro-questions" element={<IntroQuestionsPage />} />
            <Route path="/finances" element={<FinancesPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/relationships" element={<RelationshipsPage />} />
            <Route path="/personal-growth" element={<PersonalGrowthPage />} />
            <Route path="/confidence" element={<ConfidencePage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/category-processing" element={<CategoryProcessingPage />} />
            <Route path="/session-categories" element={<SessionCategoriesPage />} />
            <Route path="/focus-input" element={<FocusInputPage />} />
            <Route path="/visualization" element={<VisualizationPage />} />
            <Route path="/session-feedback" element={<SessionFeedbackPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
