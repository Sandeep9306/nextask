import type { Status, Task, TaskStats } from "../../../types";

export type BoardHeaderProps = {
  stats: TaskStats;
  onAddTask: () => void;
  onAIGenerate: () => void;
};
export type Column = {
  id: Status;
  title: string;
};

export type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export type TaskColumnProps = {
  column: { id: Status; title: string };
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
};
