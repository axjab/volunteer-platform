import type { ReactNode } from "react";
import Card from "./Card";
import { cn } from "../../lib/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  hint: string;
  icon: ReactNode;
  accent?: string;
}

export default function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "from-blue-500 to-blue-600",
}: StatCardProps){
  return (
    <Card className="relative overflow-hidden bg-gray-800 border-gray-700">
      <div className={cn("absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br opacity-20", accent)} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          <p className="mt-2 text-sm text-gray-400">{hint}</p>
        </div>
        <div className={cn("rounded-2xl bg-gradient-to-br p-3 text-white", accent)}>{icon}</div>
      </div>
    </Card>
  );
}