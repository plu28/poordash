import React, { forwardRef, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gray-800 text-white hover:bg-black hover:shadow-lg focus:ring-gray-600",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white hover:shadow-md focus:ring-gray-400",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md focus:ring-gray-400",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1 text-base",
  lg: "px-4 py-2 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...rest },
    ref
  ) => {
    const classes =
      `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();
    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
