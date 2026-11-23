import { Router } from "express";
import { categoryRouter } from "./routes/category.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/auth", authRouter);

export { router };
