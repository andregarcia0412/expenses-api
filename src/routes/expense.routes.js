import { Router } from "express";
import * as expenseController from "../controllers/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const expenseRouter = Router();
expenseRouter.use(authMiddleware);

expenseRouter.post("/me", expenseController.create);
expenseRouter.get("/me/:id", expenseController.findById);
expenseRouter.get("/me", expenseController.listExpenses);
expenseRouter.patch("/me/:id", expenseController.updateExpense);
expenseRouter.delete("/me/:id", expenseController.deleteExpense);

export { expenseRouter };
