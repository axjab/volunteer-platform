import type { UserProfile } from "../../domain/models";
import Card from "../ui/Card";

interface ProfileSummaryProps {
  user: UserProfile;
}

export default function ProfileSummary({ user }: ProfileSummaryProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-2xl font-semibold text-white">
          {user.avatar}
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
          <p className="text-gray-400">{user.role}</p>
          <p className="mt-1 text-sm text-gray-400">
            {user.department} • {user.location}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm text-gray-300">{user.bio}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Hours</p>
          <p className="mt-1 text-2xl font-semibold text-white">{user.volunteerHours}</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Activities</p>
          <p className="mt-1 text-2xl font-semibold text-white">{user.completedActivities}</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Participants Reached</p>
          <p className="mt-1 text-2xl font-semibold text-white">{user.participantsReached}</p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Badges</p>
          <p className="mt-1 text-2xl font-semibold text-white">{user.badges}</p>
        </div>
      </div>
    </Card>
  );
}