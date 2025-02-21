
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[100dvh] bg-transparent overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
