import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();
userRouter.use(authMiddleware);

userRouter.get("/", userController.findUserById);
userRouter.patch("/", userController.updateUserById);
userRouter.delete("/", userController.deleteUserById);

export { userRouter };
