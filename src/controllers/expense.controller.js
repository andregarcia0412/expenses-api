import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../schemas/expense/expense.schema.js";
import * as expenseService from "../services/expense.service.js";
import { parseId } from "../utils/parse-id.js";

export const create = async (req, res) => {
  const data = createExpenseSchema.parse(req.body);
  res.status(201).json(await expenseService.create(extractUserId(req), data));
};

export const findById = async (req, res) => {
  const expenseId = parseId(req.params.id);
  res
    .status(200)
    .json(await expenseService.findExpenseById(expenseId, extractUserId(req)));
};

export const listExpenses = async (req, res) => {
  const categoryId = req.query.categoryId;
  res
    .status(200)
    .json(
      await expenseService.listUserExpenses(
        extractUserId(req),
        categoryId ? parseId(categoryId) : undefined,
      ),
    );
};

export const updateExpense = async (req, res) => {
  const expenseId = parseId(req.params.id);
  const data = updateExpenseSchema.parse(req.body);
  res
    .status(200)
    .json(
      await expenseService.updateExpense(expenseId, extractUserId(req), data),
    );
};

export const deleteExpense = async (req, res) => {
  const expenseId = parseId(req.params.id);
  res
    .status(204)
    .json(await expenseService.deleteExpense(expenseId, extractUserId(req)));
};

const extractUserId = (req) => {
  return parseId(req.userId);
};
