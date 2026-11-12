import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import { currentUser, rewards } from "../data/mockData";
import RewardCard from "../components/rewards/RewardCard";

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Rewards & Milestones"
        title="Recognition that celebrates impact"
        subtitle="Badges, certificates, and tiers motivate continued volunteering."
      />

      <Card className="bg-gray-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-gray-400">Current recognition tier</p>
            <h3 className="mt-1 text-3xl font-semibold text-white">{currentUser.tier}</h3>
            <p className="mt-2 text-gray-300">
              You’ve unlocked 4 rewards and are on track for your next certificate.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-gray-700 px-5 py-4">
            <p className="text-sm text-gray-400">Next unlock</p>
            <p className="mt-1 text-xl font-semibold text-white">50-Hour Impact Award</p>
            <p className="mt-1 text-sm text-gray-400">8 more hours to go</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
}