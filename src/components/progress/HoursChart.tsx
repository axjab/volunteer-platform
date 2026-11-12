import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProgressEntry } from "../../domain/models";

interface HoursChartProps {
  data: ProgressEntry[];
}

export default function HoursChart({ data }: HoursChartProps) {
  return (
    <div className="h-80 rounded-lg border border-gray-700 bg-gray-800 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
          <XAxis dataKey="month" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip
            contentStyle={{
              background: "#1F2937",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Area type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} fill="url(#hoursGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}