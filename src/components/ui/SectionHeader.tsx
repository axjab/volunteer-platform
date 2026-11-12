import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: SectionHeaderProps){
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl font-semibold text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}