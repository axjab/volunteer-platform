import type { LeaderboardUser } from "../../domain/models";
import { formatHours, formatPoints } from "../../lib/format";

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  currentUserId: string;
}

export default function LeaderboardTable({
  users,
  currentUserId,
}: LeaderboardTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800">
      <table className="min-w-full text-left">
        <thead className="text-sm text-gray-300">
          <tr className="border-b border-gray-700">
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Hours</th>
            <th className="px-4 py-3">Points</th>
            <th className="px-4 py-3">Badges</th>
            <th className="px-4 py-3">Activities</th>
          </tr>
        </thead>
        <tbody>
          {users.map((person, index) => (
            <tr
              key={person.id}
              className={person.id === currentUserId ? "bg-blue-900/30" : "border-b border-gray-700 hover:bg-gray-700"}
            >
              <td className="px-4 py-4 font-semibold text-white">#{index + 1}</td>
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-white">{person.name}</p>
                  <p className="text-xs text-gray-400">{person.location}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-gray-300">{person.department}</td>
              <td className="px-4 py-4 text-gray-300">{person.team}</td>
              <td className="px-4 py-4 text-white">{formatHours(person.hours)}</td>
              <td className="px-4 py-4 text-white">{formatPoints(person.points)}</td>
              <td className="px-4 py-4 text-white">{person.badges}</td>
              <td className="px-4 py-4 text-white">{person.activities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}