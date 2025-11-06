import React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  ShoppingCart,
  User,
  ChefHat,
  ClipboardList,
  Layout as LayoutIcon,
} from "lucide-react";

interface BottomNavbarProps {
  variant: "customer" | "chef";
  onAction?: (action: string) => void;
  className?: string;
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: string;
  active?: boolean;
}

const customerNavItems: NavItem[] = [
  { icon: Home, label: "Home", action: "home" },
  { icon: Search, label: "Browse", action: "browse" },
  { icon: ShoppingCart, label: "Cart", action: "cart" },
  { icon: User, label: "Profile", action: "profile" },
];

const chefNavItems: NavItem[] = [
  { icon: LayoutIcon, label: "Dashboard", action: "dashboard" },
  { icon: ChefHat, label: "Menu", action: "menu" },
  { icon: ClipboardList, label: "Orders", action: "orders" },
  { icon: User, label: "Profile", action: "profile" },
];

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  variant,
  onAction,
  className,
}) => {
  const navItems = variant === "customer" ? customerNavItems : chefNavItems;

  const handleItemClick = (action: string) => {
    onAction?.(action);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg",
        className
      )}
    >
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.action}
              onClick={() => handleItemClick(item.action)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-1 transition-all duration-200",
                "hover:bg-gray-50 active:bg-gray-100",
                "focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-inset",
                item.active
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;
