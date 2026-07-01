import { useContext } from "react";
import type { TaskContextType } from "../types";
import { TaskContext } from "../context/TaskContext";

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider!");
  }
  return context;
}
