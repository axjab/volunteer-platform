import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps){
  return (
    <div className={cn("rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}