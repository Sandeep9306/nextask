import { useMemo, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { BoardHeader } from "./components/BoardHeader";
import { TaskColumn } from "./components/TaskColumn";
import type { Column } from "./types";
import type { Status, Task } from "../../types";
import { TaskForm } from "./components/TaskForm";
import { Modal } from "../../components/ui/Modal";
import type { TaskFormData } from "./schema/schema";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useSearchParams } from "react-router-dom";

const columns: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export function TaskBoard() {
  const { tasks, deleteTask, stats, updateTask, addTask, moveTask } =
    useTasks();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const filteredTasks = useMemo(() => {
    if (!query) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    );
  }, [tasks, query]);

  // Group tasks — keys match column ids exactly!
  const tasksByStatus = useMemo(
    () => ({
      todo: filteredTasks.filter((t) => t.status === "todo"),
      "in-progress": filteredTasks.filter((t) => t.status === "in-progress"),
      done: filteredTasks.filter((t) => t.status === "done"),
    }),
    [filteredTasks],
  );

  // Drag Handler

  function handleDragStart(event: { active: { id: string | number } }) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveTask(null); // clear overlay

    if (!over) return; // dropped outside any column

    const taskId = active.id as string;
    const newStatus = over.id as Status;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return; // no change needed

    moveTask(taskId, newStatus);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // ← must move 8px before drag starts
      },
    }),
  );

  // Handlers
  function handleAddTask() {
    setEditingTask(null); // no task = adding new
    setIsModalOpen(true);
  }

  function handleEditTask(task: Task) {
    setEditingTask(task); // existing task = editing
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleFormSubmit(data: TaskFormData) {
    if (editingTask) {
      updateTask({
        ...editingTask,
        ...data,
      });
    } else {
      addTask({
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description ?? "",
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        createdAt: new Date().toISOString(),
        aiGenerated: false,
      });
    }
    handleCloseModal();
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col ">
        {/* Header */}
        <BoardHeader
          stats={stats}
          onAddTask={handleAddTask}
          onAIGenerate={() => console.log("AI coming soon!")}
        />
        {query && filteredTasks.length === 0 && (
          <div
            className="
    flex flex-col items-center justify-center
    py-20 gap-3
  "
          >
            <p className="text-[var(--color-text-secondary)] text-sm">
              No tasks match <strong>"{query}"</strong>
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="
        text-xs text-[var(--color-primary)]
        hover:underline
      "
            >
              Clear search
            </button>
          </div>
        )}

        {/* Columns */}
        <div className="flex gap-4 mt-6 items-start overflow-x-auto pb-4 ">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id]} // ← keys match! ✅
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTask ? "Edit Task" : "Add New Task"}
        >
          <TaskForm
            initialData={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
      <DragOverlay>
        {activeTask ? (
          <div
            className="
            bg-[var(--color-surface)]
            border-2 border-[var(--color-primary)]
            rounded-lg p-4
            shadow-[var(--shadow-drag)]
            rotate-3
            w-[260px]
          "
          >
            <h3 className="text-sm font-semibold">{activeTask.title}</h3>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
