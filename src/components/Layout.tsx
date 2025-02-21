
import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">{children}</main>
    </div>
  );
};

export default Layout;
