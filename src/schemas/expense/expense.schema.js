import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z.string().max(100),
  amount: z.number().nonnegative().multipleOf(0.01),
  date: z.date().nullable(),
  categoryId: z.number().positive(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const expenseResponseSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.number(),
  date: z.date(),
  createdAt: z.date(),
});
