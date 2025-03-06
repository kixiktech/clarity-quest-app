
import { FC, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const needsFooter = !isHomePage && 
                      location.pathname !== "/privacy-policy" && 
                      location.pathname !== "/terms-of-service";

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Make all pages scrollable
    document.body.style.overflow = 'auto';

    return () => {
      // Reset on unmount if needed
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-[100dvh] bg-transparent flex flex-col">
      {/* Mobile Notice Banner - Only shows on screens larger than 768px */}
      <div className="hidden md:block fixed top-0 left-0 w-full bg-primary/95 backdrop-blur-sm z-50 border-b border-yellow-500/30 animate-banner-pulse animate-slide-in-down">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-primary-foreground flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
            This experience is optimized for mobile devices. For the best experience, please switch to your phone.
          </p>
        </div>
      </div>

      {/* Background gradients - Apply to all pages */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />

      {/* Adjust content padding when banner is visible */}
      <div className="relative z-10 md:pt-12 flex flex-col flex-1">
        {children}
        {needsFooter && <Footer className="mt-auto" />}
      </div>
    </div>
  );
};

export default Layout;
