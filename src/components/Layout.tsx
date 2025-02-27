
import { FC, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isSciencePage = location.pathname === "/science";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isSciencePage) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [isSciencePage]);

  return (
    <div className="min-h-[100dvh] bg-transparent">
      {/* Mobile Notice Banner - Only shows on screens larger than 768px */}
      <div className="hidden md:block fixed top-0 left-0 w-full bg-primary/95 backdrop-blur-sm z-50 border-b border-yellow-500/30">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-primary-foreground flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
            This experience is optimized for mobile devices. For the best experience, please switch to your phone.
          </p>
        </div>
      </div>

      {!isHomePage && (
        <>
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10" />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)] -z-10" />
        </>
      )}
      
      {/* Main content */}
      <div className="relative z-10 md:pt-12">
        {children}
      </div>
    </div>
  );
};

export default Layout;
