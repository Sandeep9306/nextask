// src/features/dashboard/components/ProgressOverview.tsx
import { ProgressBar } from '../../../components/ui/ProgressBar'
import type { TaskStats } from '../../../types'

type ProgressOverviewProps = {
  stats: TaskStats
}

export function ProgressOverview({ stats }: ProgressOverviewProps) {
  return (
    <div className="
      bg-[var(--color-surface)]
      border border-[var(--color-border)]
      rounded-lg p-5
      shadow-[var(--shadow-level-1)]
    ">
      <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
        Progress Overview
      </h2>

      {stats.total === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)]">
          No tasks yet — add your first task to see progress!
        </p>
      ) : (
        <div className="space-y-4">
          <ProgressBar
            label="To Do"
            value={stats.todo}
            total={stats.total}
            color="var(--color-text-disabled)"
          />
          <ProgressBar
            label="In Progress"
            value={stats.inProgress}
            total={stats.total}
            color="var(--color-info)"
          />
          <ProgressBar
            label="Done"
            value={stats.completed}
            total={stats.total}
            color="var(--color-success)"
          />
        </div>
      )}
    </div>
  )
}