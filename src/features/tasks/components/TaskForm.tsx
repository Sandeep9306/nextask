// src/features/tasks/components/TaskForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../../../types";
import { taskSchema, type TaskFormData } from "../schema/schema";

type TaskFormProps = {
  initialData?: Task | null; // null/undefined = adding new
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
};

export function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      status: initialData?.status ?? "todo",
      priority: initialData?.priority ?? "medium",
      dueDate: initialData?.dueDate ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
          Title
        </label>
        <input
          {...register("title")}
          placeholder="Enter task title"
          className="
            w-full h-9 px-3
            bg-[var(--color-background)]
            border border-[var(--color-border)]
            rounded text-sm
            text-[var(--color-text-primary)]
            outline-none
            focus:border-[var(--color-border-focused)]
            focus:ring-2 focus:ring-[var(--color-primary-light)]
          "
        />
        {errors.title && (
          <p className="text-xs text-[var(--color-danger)] mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter task description (optional)"
          rows={3}
          className="
            w-full px-3 py-2
            bg-[var(--color-background)]
            border border-[var(--color-border)]
            rounded text-sm
            text-[var(--color-text-primary)]
            outline-none
            resize-none
            focus:border-[var(--color-border-focused)]
            focus:ring-2 focus:ring-[var(--color-primary-light)]
          "
        />
        {errors.description && (
          <p className="text-xs text-[var(--color-danger)] mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Status + Priority — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="
              w-full h-9 px-3
              bg-[var(--color-background)]
              border border-[var(--color-border)]
              rounded text-sm
              text-[var(--color-text-primary)]
              outline-none
              focus:border-[var(--color-border-focused)]
            "
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
            Priority
          </label>
          <select
            {...register("priority")}
            className="
              w-full h-9 px-3
              bg-[var(--color-background)]
              border border-[var(--color-border)]
              rounded text-sm
              text-[var(--color-text-primary)]
              outline-none
              focus:border-[var(--color-border-focused)]
            "
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
          Due Date
        </label>
        <input
          type="date"
          {...register("dueDate")}
          className="
            w-full h-9 px-3
            bg-[var(--color-background)]
            border border-[var(--color-border)]
            rounded text-sm
            text-[var(--color-text-primary)]
            outline-none
            focus:border-[var(--color-border-focused)]
          "
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            px-4 py-2
            text-sm font-medium
            text-[var(--color-text-primary)]
            border border-[var(--color-border)]
            rounded
            hover:bg-[var(--color-background)]
            transition-colors
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            px-4 py-2
            text-sm font-medium
            text-white
            bg-[var(--color-primary)]
            rounded
            hover:bg-[var(--color-primary-hover)]
            transition-colors
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Task"
              : "Add Task"}
        </button>
      </div>
    </form>
  );
}
