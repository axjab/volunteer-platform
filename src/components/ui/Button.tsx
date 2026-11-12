import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps){
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "border border-gray-600 bg-gray-700 text-white hover:bg-gray-600",
        variant === "ghost" && "text-gray-300 hover:bg-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}