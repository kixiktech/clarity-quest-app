
import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isSciencePage = location.pathname === "/science";

  return (
    <div className={`min-h-[100dvh] bg-transparent ${isSciencePage ? "overflow-auto" : "overflow-hidden"}`}>
      {children}
    </div>
  );
};

export default Layout;
