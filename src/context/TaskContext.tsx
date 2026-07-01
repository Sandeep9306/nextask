import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  type TaskContextType,
  type TaskAction,
  type TaskState,
  type Task,
  type Status,
} from "../types";
import { json } from "zod";
import { STORAGE_KEYS } from "../constants";

export const TaskContext = createContext<TaskContextType | null>(null);

function getInitialTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (stored) {
      return JSON.parse(stored) as Task[];
    }
  } catch (error) {
    console.error("Failed to load tasks from localStorage:', error");
  }
  return initialState.tasks;
}
const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Setup project structure",
      description: "Create folders and install dependencies",
      status: "done",
      priority: "high",
      dueDate: "2024-12-20",
      createdAt: new Date().toISOString(),
      aiGenerated: false,
    },
    {
      id: "2",
      title: "Build Kanban board UI",
      description: "Create TaskBoard, TaskColumn, TaskCard components",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-12-25",
      createdAt: new Date().toISOString(),
      aiGenerated: false,
    },
    {
      id: "3",
      title: "Integrate Claude AI",
      description: "Add AI task generation feature",
      status: "todo",
      priority: "medium",
      dueDate: "2024-12-30",
      createdAt: new Date().toISOString(),
      aiGenerated: true,
    },
    {
      id: "4",
      title: "Integrate Claude AI",
      description: "Add AI task generation feature",
      status: "todo",
      priority: "medium",
      dueDate: "2024-12-30",
      createdAt: new Date().toISOString(),
      aiGenerated: true,
    },
    {
      id: "5",
      title: "Build Kanban board UI",
      description: "Create TaskBoard, TaskColumn, TaskCard components",
      status: "in-progress",
      priority: "low",
      dueDate: "2024-12-25",
      createdAt: new Date().toISOString(),
      aiGenerated: false,
    },
  ],
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t,
        ),
      };

    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.newStatus }
            : t,
        ),
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState, // fallback value
    () => ({ tasks: getInitialTasks() }),
  );


  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = useCallback((task: Task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  }, []);
  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const updateTask = useCallback((task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  }, []);
  const moveTask = useCallback((id: string, newStatus: Status) => {
    dispatch({ type: "MOVE_TASK", payload: { id, newStatus } });
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = state.tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < today && t.status !== "done",
    );
    const dueSoon = state.tasks
      .filter((t) => {
        if (!t.dueDate || t.status === "done") return false;
        const due = new Date(t.dueDate);
        const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 3;
      })
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
      );
    const priorityCounts = {
      low: state.tasks.filter((t) => t.priority === "low").length,
      medium: state.tasks.filter((t) => t.priority === "medium").length,
      high: state.tasks.filter((t) => t.priority === "high").length,
    };

    const completed = state.tasks.filter((t) => t.status === "done").length;
    const completionRate =
      state.tasks.length > 0
        ? Math.round((completed / state.tasks.length) * 100)
        : 0;

    return {
      total: state.tasks.length,
      completed,
      inProgress: state.tasks.filter((t) => t.status === "in-progress").length,
      todo: state.tasks.filter((t) => t.status === "todo").length,
      overdue,
      dueSoon,
      priorityCounts,
      completionRate,
    };
  }, [state.tasks]);

  const value: TaskContextType = useMemo(
    () => ({
      tasks: state.tasks,
      addTask,
      deleteTask,
      updateTask,
      moveTask,
      stats,
    }),
    [state.tasks, addTask, deleteTask, updateTask, moveTask, stats],
  );
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
