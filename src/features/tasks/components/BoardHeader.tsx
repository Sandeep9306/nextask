// src/features/tasks/components/BoardHeader.tsx
import { Sparkles, Plus } from "lucide-react";

import type { BoardHeaderProps } from "../types";

export function BoardHeader({
  stats,
  onAddTask,
  onAIGenerate,
}: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      {/* Left — Title + Stats */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          My Tasks
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {stats.total} total tasks · {stats.completed} completed
          {stats.overdue.length > 0 && (
            <span className="text-[var(--color-danger)]">
              {" "}
              · {stats.overdue.length} overdue
            </span>
          )}
        </p>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAIGenerate}
          className="
            flex items-center gap-1.5
            px-4 h-9
            text-sm font-medium
            text-[var(--color-primary)]
            bg-[var(--color-primary-light)]
            rounded
            hover:bg-[var(--color-primary)]
            hover:text-white
            transition-colors
          "
        >
          <Sparkles className="w-4 h-4" />
          AI Generate
        </button>

        <button
          onClick={onAddTask}
          className="
            flex items-center gap-1.5
            px-4 h-9
            text-sm font-medium
            text-white
            bg-[var(--color-primary)]
            rounded
            hover:bg-[var(--color-primary-hover)]
            transition-colors
          "
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>
    </div>
  );
}
