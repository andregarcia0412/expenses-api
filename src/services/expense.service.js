import { prisma } from "../lib/prisma.js";
import { expenseResponseSchema } from "../schemas/expense/expense.schema.js";
import * as categoryService from "./category.service.js";

export const create = async (userId, data) => {
  await categoryService.findCategoryById(data.categoryId);

  const expense = await prisma.expense.create({
    data: {
      ...data,
      userId,
    },
    include: { category: { select: { name: true } } },
  });

  return expenseResponseSchema.parse(expense);
};
