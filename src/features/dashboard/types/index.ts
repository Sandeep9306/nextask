import type { Task, TaskStats } from "../../../types";

export type DueSoonListProps = {
  tasks: Task[]; // already filtered + sorted from stats.dueSoon
};

export type PriorityBreakdownProps = {
  stats: TaskStats;
};
export type ProgressOverviewProps = {
  stats: TaskStats;
};
export type StatsRowProps = {
  stats: TaskStats;
};

export type WelcomeHeaderProps = {
  userName: string;
  dueTodayCount: number;
};
