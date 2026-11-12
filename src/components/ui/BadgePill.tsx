import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgePillProps {
  children: ReactNode;
  active?: boolean;
}

export default function BadgePill({ children, active = false }: BadgePillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
          : "border-gray-700 bg-gray-800 text-gray-400"
      )}
    >
      {children}
    </span>
  );
}