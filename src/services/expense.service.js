import { NotFoundError } from "../errors/not-found.error.js";
import { prisma } from "../lib/prisma.js";
import { expenseResponseSchema } from "../schemas/expense/expense.schema.js";
import * as categoryService from "./category.service.js";

const include = { category: { select: { name: true } } };

export const create = async (userId, data) => {
  await categoryService.findCategoryById(data.categoryId);

  const expense = await prisma.expense.create({
    data: {
      ...data,
      userId,
    },
    include,
  });

  return expenseResponseSchema.parse(expense);
};

export const listUserExpenses = async (userId, categoryId = undefined) => {
  return (
    await prisma.expense.findMany({
      where: { userId, categoryId },
      include,
      orderBy: {
        date: "desc",
      },
    })
  ).map((expense) => expenseResponseSchema.parse(expense));
};

export const findExpenseById = async (id, userId) => {
  return expenseResponseSchema.parse(await findUserExpense(id, userId));
};

export const updateExpense = async (id, userId, data) => {
  await findUserExpense(id, userId);

  if (data.categoryId !== undefined)
    await categoryService.findCategoryById(data.categoryId);

  return expenseResponseSchema.parse(
    await prisma.expense.update({ where: { id, userId }, data, include }),
  );
};

export const deleteExpense = async (id, userId) => {
  await findUserExpense(id, userId);
  await prisma.expense.delete({ where: { id, userId } });
};

const findUserExpense = async (id, userId) => {
  const expense = await prisma.expense.findUnique({
    where: { id, userId },
    include,
  });
  if (!expense) throw new NotFoundError("Expense not found");
  return expense;
};
