import { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import { DEPARTMENTS, TIMEFRAMES } from "../domain/constants";
import type { LeaderboardFiltersState } from "../domain/models";
import { currentUser, leaderboard } from "../data/mockData";
import { filterLeaderboard, getDepartmentsWithAll } from "../lib/leaderboard";
import LeaderboardFilters from "../components/leaderboard/LeaderboardFilters";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  const [filters, setFilters] = useState<LeaderboardFiltersState>({
    department: "All",
    timeframe: "This Quarter",
  });

  const filtered = useMemo(() => filterLeaderboard(leaderboard, filters), [filters]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Leaderboard"
        title="Recognize top volunteers"
        subtitle="Healthy competition and visible recognition drive engagement."
      />

      <Card>
        <LeaderboardFilters
          filters={filters}
          departments={getDepartmentsWithAll(DEPARTMENTS)}
          timeframes={TIMEFRAMES}
          onChange={setFilters}
        />
      </Card>

      <Card>
        <LeaderboardTable users={filtered} currentUserId={currentUser.id} />
      </Card>
    </div>
  );
}