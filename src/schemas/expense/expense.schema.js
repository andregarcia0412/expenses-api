import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z.string().trim().min(1).max(100),
  amount: z.number().positive().multipleOf(0.01),
  date: z.iso.date().transform((date) => new Date(date)),
  categoryId: z.int().positive(),
});

export const updateExpenseSchema = createExpenseSchema;

export const expenseResponseSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.coerce.number(),
  date: z.date(),
  category: z.object({ id: z.number(), name: z.string() }),
  createdAt: z.date(),
});
