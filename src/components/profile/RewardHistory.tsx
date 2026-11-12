import type { Reward } from "../../domain/models";

interface RewardHistoryProps {
  rewards: Reward[];
}

export default function RewardHistory({ rewards }: RewardHistoryProps){
  return (
    <div className="mt-3 grid gap-3 md:grid-cols-2">
      {rewards.map((reward) => (
        <div key={reward.id} className="rounded-lg bg-gray-800 p-4 border border-gray-700">
          <p className="text-2xl text-green-300">{reward.icon}</p>
          <h4 className="mt-2 font-semibold text-white">{reward.title}</h4>
          <p className="mt-1 text-sm text-gray-400">{reward.type}</p>
        </div>
      ))}
    </div>
  );
}