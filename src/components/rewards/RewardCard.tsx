import type { Reward } from "../../domain/models";
import Card from "../ui/Card";
import { cn } from "../../lib/cn";

interface RewardCardProps {
  reward: Reward;
}

export default function RewardCard({ reward }: RewardCardProps){
  return (
    <Card className={cn("overflow-hidden", reward.unlocked ? "border-0" : "opacity-85")}>
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl">{reward.icon}</p>
            <h4 className="mt-3 text-xl font-semibold text-white">{reward.title}</h4>
            <p className="mt-1 text-sm text-gray-400">{reward.type}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              reward.unlocked
                ? "bg-gray-700 text-green-300"
                : "bg-gray-700 text-gray-300"
            )}
          >
            {reward.unlocked ? "Unlocked" : "Locked"}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-300">{reward.description}</p>

        <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800 p-3">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400">Requirement</p>
          <p className="mt-1 text-sm text-gray-300">{reward.requirement}</p>
        </div>
      </div>
    </Card>
  );
}