// src/pages/DashboardPage.tsx
import { useTasks } from "../hooks/useTasks";
import { WelcomeHeader } from "../features/dashboard/components/WelcomeHeader";
import { StatsRow } from "../features/dashboard/components/StatsRow";
import { ProgressOverview } from "../features/dashboard/components/ProgressOverview";
import { DueSoonList } from "../features/dashboard/components/DueSoonList";
import { PriorityBreakdown } from "../features/dashboard/components/PriorityBreakdown";

export const DashboardPage = () => {
  const { stats } = useTasks();

  const dueTodayCount = stats.dueSoon.filter((t) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(t.dueDate!);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  }).length;

  return (
    <div className="flex flex-col gap-6">
      <WelcomeHeader userName="Sandeep" dueTodayCount={dueTodayCount} />

      <StatsRow stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProgressOverview stats={stats} />
        <DueSoonList tasks={stats.dueSoon} />
      </div>

      <PriorityBreakdown stats={stats} />
    </div>
  );
};
