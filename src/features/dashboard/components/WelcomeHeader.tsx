// src/features/dashboard/components/WelcomeHeader.tsx

import type { WelcomeHeaderProps } from "../types";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function WelcomeHeader({ userName, dueTodayCount }: WelcomeHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        {getGreeting()}, {userName} 👋
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
        {dueTodayCount > 0
          ? `You have ${dueTodayCount} task${dueTodayCount > 1 ? "s" : ""} due today`
          : "No tasks due today — great pace!"}
      </p>
    </div>
  );
}
