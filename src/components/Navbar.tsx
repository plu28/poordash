import React from "react";

type Variant = "default" | "customer" | "chef";

interface NavItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface NavbarProps {
  variant?: Variant;
  onLogout?: () => void;
  // optionally pass className or children if you want to extend
  className?: string;
}

const getNavItems = (variant: Variant, onLogout?: () => void): NavItem[] => {
  const common: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  if (variant === "customer") {
    return [
      ...common,
      { label: "Browse Chefs", href: "/chefs" },
      { label: "My Orders", href: "/orders" },
      { label: "Cart", href: "/cart" },
      { label: "Profile", href: "/profile" },
      { label: "Logout", href: "#logout", onClick: onLogout },
    ];
  }

  if (variant === "chef") {
    return [
      ...common,
      { label: "Dashboard", href: "/chef/dashboard" },
      { label: "Orders", href: "/chef/orders" },
      { label: "Menu", href: "/chef/menu" },
      { label: "Earnings", href: "/chef/earnings" },
      { label: "Profile", href: "/profile" },
      { label: "Logout", href: "#logout", onClick: onLogout },
    ];
  }

  // default / guest
  return [
    ...common,
    { label: "Sign Up", href: "/signup" },
    { label: "Login", href: "/login" },
  ];
};

const Navbar: React.FC<NavbarProps> = ({
  variant = "default",
  onLogout,
  className = "",
}) => {
  const items = getNavItems(variant, onLogout);

  return (
    <nav
      className={`poordash-navbar flex items-center justify-between p-4 bg-white shadow-sm ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="brand">
        <a href="/" className="text-lg font-semibold">
          PoorDash
        </a>
      </div>

      <ul className="nav-items flex gap-4 list-none m-0 p-0">
        {items.map((it) => (
          <li key={it.label}>
            {/* If you use react-router, replace <a> with <Link to={it.href}> */}
            <a
              href={it.href}
              onClick={(e) => {
                if (it.onClick) {
                  e.preventDefault();
                  it.onClick();
                }
              }}
              className="text-sm text-gray-700 hover:text-black"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;