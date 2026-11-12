import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import ProgressBar from "../components/ui/ProgressBar";
import ProfileSummary from "../components/profile/ProfileSummary";
import RewardHistory from "../components/profile/RewardHistory";
import NotificationManager from "../components/notifications/NotificationManager";
import NotificationList from "../components/notifications/NotificationList";
import { completedActivities, currentUser, rewards } from "../data/mockData";
import { getUnlockedRewards } from "../lib/rewards";

export default function ProfilePage() {
  const unlockedRewards = getUnlockedRewards(rewards);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Profile"
        title="Your volunteering story"
        subtitle="A complete view of your stats, progress, rewards, and recent activity."
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ProfileSummary user={currentUser} />

        <Card className="bg-gray-800 border-gray-700">
          <SectionHeader title="Milestone progress" subtitle="Progress toward your next volunteering award" />
          <div className="rounded-2xl border border-gray-700 bg-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Next milestone</p>
                <p className="mt-1 text-xl font-semibold text-white">50-Hour Impact Award</p>
              </div>
              <p className="text-sm text-gray-400">
                {currentUser.volunteerHours} / {currentUser.nextMilestoneHours} hours
              </p>
            </div>
            <div className="mt-4">
              <ProgressBar value={currentUser.volunteerHours} max={currentUser.nextMilestoneHours} />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-gray-400">Reward history</p>
            <RewardHistory rewards={unlockedRewards} />
          </div>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <SectionHeader title="Recent activity" subtitle="Most recent volunteering events and contributions" />
        <div className="space-y-3">
          {completedActivities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-700 bg-gray-800 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-medium text-white">{activity.title}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {activity.category} • {activity.date}
                </p>
                <p className="mt-2 text-sm text-gray-300">{activity.impact}</p>
              </div>
              <div className="rounded-full bg-blue-900 px-3 py-1 text-sm text-blue-300">
                {activity.hours} hours
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NotificationManager />
        <div>
          <SectionHeader title="Notifications" subtitle="Your recent platform notifications" />
          <NotificationList className="h-96" />
        </div>
      </div>
    </div>
  );
}