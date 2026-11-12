import type { Activity } from "../../domain/models";
import { formatShortDate } from "../../lib/format";

interface ActivityListProps {
  activities: Activity[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {activities.map((activity) => (
        <div key={activity.id} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{activity.category}</p>
              <h4 className="mt-2 font-semibold text-white">{activity.title}</h4>
            </div>
            <span className="rounded-full bg-blue-900 px-2 py-1 text-xs text-blue-300">{activity.hours}h</span>
          </div>
          <p className="mt-3 text-sm text-gray-300">{activity.impact}</p>
          <p className="mt-3 text-xs text-gray-400">{formatShortDate(activity.date)}</p>
        </div>
      ))}
    </div>
  );
}