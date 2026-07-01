// TaskColumn needs to know what props to expect:

import { useDroppable } from "@dnd-kit/core";
import type { TaskColumnProps } from "../types";
import { TaskCard } from "./TaskCard";

export function TaskColumn({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`
        w-[280px] flex-shrink-0
        rounded-lg p-3
        bg-[var(--color-background)]
        transition-colors duration-200
        ${isOver ? "ring-2 ring-[var(--color-primary)]" : ""}
      `}
    >
      {/* ⚠️ THIS HEADER MUST BE PRESENT — check if you have it! */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3
          className="
          text-xs font-semibold uppercase tracking-wide
          text-[var(--color-text-secondary)]
        "
        >
          {column.title}
        </h3>
        <span
          className="
          text-xs font-medium
          bg-[var(--color-surface)]
          text-[var(--color-text-secondary)]
          px-2 py-0.5 rounded-full
          border border-[var(--color-border)]
        "
        >
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-h-[40px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      <button
        onClick={onAddTask}
        className="
          w-full mt-2 py-2
          text-sm text-[var(--color-text-secondary)]
          hover:text-[var(--color-text-primary)]
          hover:bg-[var(--color-surface)]
          rounded
          transition-colors
          flex items-center justify-center gap-1
        "
      >
        + Add Task
      </button>
    </div>
  );
}
