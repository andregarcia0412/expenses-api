import { z } from "zod";

export const createExpenseSchema = z
  .object({
    description: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .meta({ description: "Descrição da despesa", example: "Almoço" }),
    amount: z.number().positive().multipleOf(0.01).meta({
      description: "Valor da despesa (até 2 casas decimais)",
      example: 35.9,
    }),
    date: z.iso
      .date()
      .transform((date) => new Date(date))
      .meta({ description: "Data da despesa (YYYY-MM-DD)", example: "2026-11-20" }),
    categoryId: z
      .int()
      .positive()
      .meta({ description: "ID de uma categoria existente", example: 1 }),
  })
  .meta({ id: "ExpenseRequest" });

export const updateExpenseSchema = createExpenseSchema;

export const expenseResponseSchema = z
  .object({
    id: z.number().meta({ example: 1 }),
    description: z.string().meta({ example: "Almoço" }),
    amount: z.coerce.number().meta({ example: 35.9 }),
    date: z.date().meta({ example: "2026-11-20T00:00:00.000Z" }),
    category: z.object({
      id: z.number().meta({ example: 1 }),
      name: z.string().meta({ example: "Alimentação" }),
    }),
    createdAt: z.date().meta({ example: "2026-11-20T15:30:00.000Z" }),
  })
  .meta({ id: "Expense" });
