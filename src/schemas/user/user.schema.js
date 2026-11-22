import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3).max(100),
  email: z.email().trim().max(255),
  password: z.string().min(6).max(72),
});

export const updateUserSchema = createUserSchema.partial();

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
});
