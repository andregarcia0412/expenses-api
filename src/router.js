import { Router } from "express";
import { authRouter } from "./routes/auth.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { expenseRouter } from "./routes/expense.routes.js";
import { userRouter } from "./routes/user.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/auth", authRouter);
router.use("/expense", expenseRouter);

export { router };
