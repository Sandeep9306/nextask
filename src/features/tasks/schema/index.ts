// src/features/tasks/schema.ts
import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title too long"),

  description: z.string().max(300, "Description too long").optional(),

  status: z.enum(["todo", "in-progress", "done"]),

  priority: z.enum(["low", "medium", "high"]),

  dueDate: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
