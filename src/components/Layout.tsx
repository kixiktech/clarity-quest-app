
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
      {!isHomePage && (
        <>
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_100%)]" />
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
