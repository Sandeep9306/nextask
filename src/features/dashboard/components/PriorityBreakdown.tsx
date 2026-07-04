// src/features/dashboard/components/PriorityBreakdown.tsx
import { ProgressBar } from "../../../components/ui/ProgressBar";
import type { PriorityBreakdownProps } from "../types";

export function PriorityBreakdown({ stats }: PriorityBreakdownProps) {
  const totalPriority =
    stats.priorityCounts.low +
    stats.priorityCounts.medium +
    stats.priorityCounts.high;

  return (
    <div
      className="
      bg-[var(--color-surface)]
      border border-[var(--color-border)]
      rounded-lg p-5
      shadow-[var(--shadow-level-1)]
    "
    >
      <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
        Priority Breakdown
      </h2>

      {totalPriority === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)]">
          No tasks to show priority for yet.
        </p>
      ) : (
        <div className="space-y-4">
          <ProgressBar
            label="High"
            value={stats.priorityCounts.high}
            total={totalPriority}
            color="var(--color-danger)"
          />
          <ProgressBar
            label="Medium"
            value={stats.priorityCounts.medium}
            total={totalPriority}
            color="var(--color-warning)"
          />
          <ProgressBar
            label="Low"
            value={stats.priorityCounts.low}
            total={totalPriority}
            color="var(--color-success)"
          />
        </div>
      )}
    </div>
  );
}
