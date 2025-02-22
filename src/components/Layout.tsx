
import { FC, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isSciencePage = location.pathname === "/science";

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
      {children}
    </div>
  );
};

export default Layout;
