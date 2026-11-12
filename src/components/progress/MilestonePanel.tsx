import type { Reward } from "../../domain/models";
import ProgressBar from "../ui/ProgressBar";

interface MilestonePanelProps {
  currentHours: number;
  nextMilestoneHours: number;
  rewards: Reward[];
}

export default function MilestonePanel({
  currentHours,
  nextMilestoneHours,
  rewards,
}: MilestonePanelProps) {
  const remainingHours = nextMilestoneHours - currentHours;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4">
        <p className="text-sm text-gray-400">Upcoming reward</p>
        <h4 className="mt-1 text-xl font-semibold text-white">50-Hour Impact Award</h4>
        <p className="mt-1 text-sm text-gray-400">{remainingHours} hours remaining</p>
      </div>

      <ProgressBar value={currentHours} max={nextMilestoneHours} />

      <div className="space-y-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="flex items-center justify-between rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{reward.icon}</span>
              <div>
                <p className="font-medium text-white">{reward.title}</p>
                <p className="text-xs text-gray-400">{reward.requirement}</p>
              </div>
            </div>
            <span className={`text-xs ${reward.unlocked ? "text-green-300" : "text-gray-400"}`}>
              {reward.unlocked ? "Unlocked" : "Locked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}