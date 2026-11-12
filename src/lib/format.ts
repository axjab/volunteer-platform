export function formatHours(hours: number): string {
  return `${hours} hrs`;
}

export function formatPoints(points: number): string {
  return `${points.toLocaleString()} pts`;
}

export function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}