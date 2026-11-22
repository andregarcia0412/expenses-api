import { Router } from "express";
import {
  createUser,
  deleteUserById,
  findUserById,
  updateUserById,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/:id", findUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

export { userRouter };
