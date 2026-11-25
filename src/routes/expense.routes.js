import { Router } from "express";
import * as expenseController from "../controllers/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const expenseRouter = Router();
expenseRouter.use(authMiddleware);

expenseRouter.post("/", expenseController.create);
expenseRouter.get("/:id", expenseController.findById);
expenseRouter.get("/", expenseController.listExpenses);
expenseRouter.put("/:id", expenseController.updateExpense);
expenseRouter.delete("/:id", expenseController.deleteExpense);

export { expenseRouter };
