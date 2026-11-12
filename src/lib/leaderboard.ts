import type { Department, LeaderboardFiltersState, LeaderboardUser } from "../domain/models";

export function getLeaderboardRank(users: LeaderboardUser[], userId: string): number {
  return users.findIndex((user) => user.id === userId) + 1;
}

export function sortLeaderboard(users: LeaderboardUser[]): LeaderboardUser[] {
  return [...users].sort((a, b) => b.points - a.points);
}

export function filterLeaderboard(
  users: LeaderboardUser[],
  filters: LeaderboardFiltersState
): LeaderboardUser[] {
  let result = [...users];

  if (filters.department !== "All") {
    result = result.filter((user) => user.department === filters.department);
  }

  return sortLeaderboard(result);
}

export function getDepartmentsWithAll(
  departments: readonly Department[]
): Array<Department | "All"> {
  return ["All", ...departments];
}