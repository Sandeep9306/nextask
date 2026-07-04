import { Pencil, Trash2, Bot, Calendar } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { TaskCardProps } from "../types";

// ── Helper: format date ───────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Helper: priority config ───────────────────────────
const priorityConfig = {
  low: {
    bg: "bg-[var(--color-success-light)]",
    text: "text-[var(--color-success-text)]",
    label: "Low",
  },
  medium: {
    bg: "bg-[var(--color-warning-light)]",
    text: "text-[var(--color-warning-text)]",
    label: "Medium",
  },
  high: {
    bg: "bg-[var(--color-danger-light)]",
    text: "text-[var(--color-danger-text)]",
    label: "High",
  },
};

// ── Types ─────────────────────────────────────────────


// ── Component ─────────────────────────────────────────
export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const priority = priorityConfig[task.priority];

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef} // ← dnd-kit needs this ref
      style={style} // ← position while dragging
      {...attributes} // ← accessibility attrs
      {...listeners}
      className="
      group                              /* hover trigger */
      bg-[var(--color-surface)]
      border border-[var(--color-border)]
      rounded-lg
      p-4
      cursor-pointer
      shadow-[var(--shadow-level-1)]
      hover:border-[var(--color-border-hover)]
      hover:shadow-[var(--shadow-level-2)]
      transition-all duration-200
    "
    >
      {/* Row 1 — Priority + AI Badge */}
      <div className="flex items-center justify-between mb-3">
        {/* Priority badge */}
        <span
          className={`
          ${priority.bg} ${priority.text}
          text-xs font-semibold
          px-2 py-0.5
          rounded-full
        `}
        >
          {priority.label}
        </span>

        {/* AI badge — only if aiGenerated */}
        {task.aiGenerated && (
          <span
            className="
            flex items-center gap-1
            bg-[var(--color-primary-light)]
            text-[var(--color-primary)]
            text-xs font-medium
            px-2 py-0.5
            rounded-full
          "
          >
            <Bot className="w-3 h-3" />
            AI
          </span>
        )}
      </div>

      {/* Row 2 — Title */}
      <h3
        className="
        text-sm font-semibold
        text-[var(--color-text-primary)]
        mb-1
        line-clamp-2    /* max 2 lines */
      "
      >
        {task.title}
      </h3>

      {/* Row 3 — Description */}
      {task.description && (
        <p
          className="
          text-xs
          text-[var(--color-text-secondary)]
          mb-3
          line-clamp-2    /* max 2 lines */
        "
        >
          {task.description}
        </p>
      )}

      {/* Row 4 — Date + Actions */}
      <div className="flex items-center justify-between mt-2">
        {/* Due date */}
        {task.dueDate ? (
          <span
            className={`
            flex items-center gap-1
            text-xs
            ${
              isOverdue
                ? "text-[var(--color-danger)]"
                : "text-[var(--color-text-secondary)]"
            }
          `}
          >
            <Calendar className="w-3 h-3" />
            {formatDate(task.dueDate)}
          </span>
        ) : (
          <span /> // empty span to keep layout
        )}

        {/* Action buttons — hidden until hover */}
        <div
          className="
          flex items-center gap-1
           group-hover:opacity-100
          transition-opacity duration-200
        "
        >
          {/* Edit */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // don't bubble to card click
              onEdit(task);
            }}
            className="
              p-1.5 rounded
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-primary)]
              hover:bg-[var(--color-primary-light)]
              transition-colors
            "
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // don't bubble to card click
              console.log("Delete clicked! Task id:", task.id);
              onDelete(task.id);
            }}
            className="
              p-1.5 rounded
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-danger)]
              hover:bg-[var(--color-danger-light)]
              transition-colors
            "
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
