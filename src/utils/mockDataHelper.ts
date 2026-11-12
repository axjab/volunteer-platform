import { Opportunity } from "../domain/models";
import { opportunities } from "../data/mockData";

export function getMockRecentActivity(count: number = 4) {
  // Return mock recent activity data
  return opportunities.slice(0, count).map(opportunity => ({
    id: opportunity.id,
    user: "User",
    activity: opportunity.title,
    hours: Math.floor(Math.random() * 5) + 1,
    date: new Date().toISOString().split('T')[0]
  }));
}

export function getRealRecentActivity() {
  // Return sample data that would come from API in real implementation
  return [
    { id: 1, user: "Alex Johnson", activity: "Cybersecurity Workshop", hours: 4, date: "2023-06-15" },
    { id: 2, user: "Maria Garcia", activity: "Robotics Competition", hours: 6, date: "2023-06-14" },
    { id: 3, user: "James Smith", activity: "Mathematics Workshop", hours: 3, date: "2023-06-13" },
    { id: 4, user: "Sarah Wilson", activity: "AI Conference", hours: 8, date: "2023-06-12" }
  ];
}