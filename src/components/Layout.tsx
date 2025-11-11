import React from "react";
import { useLocation } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";


interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  bottomNavVariant?: "customer" | "chef";
  onBottomNavAction?: (action: string) => void;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showBottomNav = false,
  bottomNavVariant = "customer",
  onBottomNavAction,
  className = "",
}) => {
  return (
    <div className={`mx-auto max-w-[475px] bg-gray-50 flex flex-col ${className}`}>
      {/* Main content area */}
      <main className={`flex-1 ${showBottomNav ? "pb-16" : ""}`}>
        <div className="container mx-auto px-4 py-6 max-w-7xl">{children}</div>
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavbar variant={bottomNavVariant} onAction={onBottomNavAction} />
      )}
    </div>
  );
};

export default Layout;
