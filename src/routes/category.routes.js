import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/", categoryController.listCategories);
categoryRouter.patch("/:id", categoryController.updateCategoryById);
categoryRouter.delete("/:id", categoryController.deleteCategoryById);

export { categoryRouter };
