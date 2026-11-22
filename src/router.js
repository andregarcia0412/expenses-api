import { Router } from "express";
import { userRouter } from "./routes/user.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

router.use("/user", userRouter);

export { router };
