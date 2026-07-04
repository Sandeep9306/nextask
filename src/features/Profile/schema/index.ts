import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),

  role: z.string().max(50, "Role too long").optional(),

  email: z.string().email("Invalid email format").optional().or(z.literal("")),

  bio: z.string().max(150, "Bio must be under 150 characters").optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
