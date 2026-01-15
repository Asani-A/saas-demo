import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50),
  description: z.string().max(200).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});
