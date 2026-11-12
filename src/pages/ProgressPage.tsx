import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import { completedActivities, currentUser, progressHistory, rewards } from "../data/mockData";
import HoursChart from "../components/progress/HoursChart";
import MilestonePanel from "../components/progress/MilestonePanel";
import ActivityList from "../components/progress/ActivityList";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Volunteer Progress"
        title="Track your impact over time"
        subtitle="Monitor hours, activities, and reward momentum in one place."
      />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <SectionHeader title="Volunteer hours over time" subtitle="Monthly contribution trend" />
          <HoursChart data={progressHistory} />
        </Card>

        <Card>
          <SectionHeader title="Next milestone" subtitle="Keep the momentum going" />
          <MilestonePanel
            currentHours={currentUser.volunteerHours}
            nextMilestoneHours={currentUser.nextMilestoneHours}
            rewards={rewards}
          />
        </Card>
      </div>

      <Card>
        <SectionHeader title="Completed activities" subtitle="Your recent volunteering contributions" />
        <ActivityList activities={completedActivities} />
      </Card>
    </div>
  );
}