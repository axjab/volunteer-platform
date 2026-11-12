import type { Reward } from "../domain/models";

export function getUnlockedRewards(rewards: Reward[]): Reward[] {
  return rewards.filter((reward) => reward.unlocked);
}

export function getNextLockedReward(rewards: Reward[]): Reward | undefined {
  return rewards.find((reward) => !reward.unlocked);
}