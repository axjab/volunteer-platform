import type {
  DEPARTMENTS,
  LOCATIONS,
  OPPORTUNITY_FORMATS,
  REWARD_TYPES,
  STEM_CATEGORIES,
  TIMEFRAMES,
} from "./constants";

export type StemCategory = (typeof STEM_CATEGORIES)[number];
export type OpportunityFormat = (typeof OPPORTUNITY_FORMATS)[number];
export type RewardType = (typeof REWARD_TYPES)[number];
export type Timeframe = (typeof TIMEFRAMES)[number];
export type Department = (typeof DEPARTMENTS)[number];
export type Location = (typeof LOCATIONS)[number] | "Remote";

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  department: Department;
  location: Location;
  team: string;
  avatar: string;
  volunteerHours: number;
  completedActivities: number;
  points: number;
  badges: number;
  tier: string;
  nextMilestoneHours: number;
  bio: string;
  email: string;
  participantsReached: number;
}

export interface ProgressEntry {
  month: string;
  hours: number;
}

export interface Activity {
  id: number;
  title: string;
  date: string;
  hours: number;
  category: StemCategory;
  impact: string;
}

export interface Reward {
  id: string;
  title: string;
  type: RewardType;
  requirement: string;
  unlocked: boolean;
  icon: string;
  description: string;
  milestoneHours?: number;
  participantsReached?: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  department: Department;
  location: Location;
  hours: number;
  points: number;
  badges: number;
  activities: number;
  team: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: StemCategory;
  ageGroup: string;
  format: OpportunityFormat;
  location: Location;
  duration: string;
  impact: string;
  featured: boolean;
  participants?: number;
}

export interface OpportunityFiltersState {
  search: string;
  category: StemCategory | "All";
  format: OpportunityFormat | "All";
  location: Location | "All";
}

export interface LeaderboardFiltersState {
  department: Department | "All";
  timeframe: Timeframe;
}