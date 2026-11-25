import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z.string().max(100),
  amount: z.number().nonnegative().multipleOf(0.01),
  date: z.iso.date().transform((date) => new Date(date)),
  categoryId: z.number().positive(),
});

export const updateExpenseSchema = createExpenseSchema;

export const expenseResponseSchema = z.object({
  id: z.number(),
  description: z.string(),
  amount: z.coerce.number(),
  date: z.date(),
  category: z
    .object({ name: z.string() })
    .transform((category) => category.name),
  createdAt: z.date(),
});
