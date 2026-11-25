import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();
categoryRouter.use(authMiddleware);

categoryRouter.get("/", categoryController.listCategories);

export { categoryRouter };
