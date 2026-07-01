import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  aiGenerated: boolean;
};

export type Board = {
  columns: [];
  tasks: [];
};

export type SideBarOption = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type TaskState = {
  tasks: Task[];
};

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | {
      type: "MOVE_TASK";
      payload: {
        id: string;
        newStatus: Status;
      };
    };

export type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: Status) => void;
  stats: TaskStats;
};
export type TaskStats = {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  overdue: Task[];
  dueSoon: Task[];
  priorityCounts: {
    low: number;
    medium: number;
    high: number;
  };
  completionRate: number;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export type ProgressBarProps = {
  label: string;
  value: number;
  total: number;
  color: string; // pass a CSS variable color
};

export type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string; // text + icon color
  bgColor: string; // icon background tint
  onClick?: () => void;
};
