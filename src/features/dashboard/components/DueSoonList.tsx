// src/features/dashboard/components/DueSoonList.tsx
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { getDateUrgencyColor, getRelativeDateLabel } from "../../../lib/utils";
import type { DueSoonListProps } from "../types";

export function DueSoonList({ tasks }: DueSoonListProps) {
  const navigate = useNavigate();
  const visibleTasks = tasks.slice(0, 5);

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
        Due Soon
      </h2>

      {visibleTasks.length === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)]">
          No upcoming deadlines 🎉
        </p>
      ) : (
        <div className="space-y-3">
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => navigate("/tasks")}
              className="
                flex items-start gap-2
                cursor-pointer
                group
              "
            >
              <Calendar
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: getDateUrgencyColor(task.dueDate!) }}
              />
              <div className="min-w-0">
                <p
                  className="
                  text-sm text-[var(--color-text-primary)]
                  truncate
                  group-hover:text-[var(--color-primary)]
                  transition-colors
                "
                >
                  {task.title}
                </p>
                <p
                  className="text-xs"
                  style={{ color: getDateUrgencyColor(task.dueDate!) }}
                >
                  {getRelativeDateLabel(task.dueDate!)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
