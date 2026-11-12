import BadgePill from "../ui/BadgePill";
import type { Department, LeaderboardFiltersState, Timeframe } from "../../domain/models";

interface LeaderboardFiltersProps {
  filters: LeaderboardFiltersState;
  departments: ReadonlyArray<Department | "All">;
  timeframes: ReadonlyArray<Timeframe>;
  onChange: (next: LeaderboardFiltersState) => void;
}

export default function LeaderboardFilters({
  filters,
  departments,
  timeframes,
  onChange,
}: LeaderboardFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {departments.map((item) => (
          <button key={item} onClick={() => onChange({ ...filters, department: item })}>
            <BadgePill active={filters.department === item}>{item}</BadgePill>
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-auto">
        {timeframes.map((item) => (
          <button key={item} onClick={() => onChange({ ...filters, timeframe: item })}>
            <BadgePill active={filters.timeframe === item}>{item}</BadgePill>
          </button>
        ))}
      </div>
    </div>
  );
}