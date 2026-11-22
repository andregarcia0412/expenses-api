import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category/category.schema.js";
import * as categoryService from "../services/category.service.js";
import { parseId } from "../utils/parse-id.js";

export const createCategory = async (req, res) => {
  const data = createCategorySchema.parse(req.body);
  res.status(201).json(await categoryService.create(data));
};

export const listCategories = async (_req, res) => {
  res.status(200).json(await categoryService.listCategories());
};

export const updateCategoryById = async (req, res) => {
  const id = parseId(req.params.id);
  const data = updateCategorySchema.parse(req.body);
  res.status(200).json(await categoryService.updateCategoryById(id, data));
};

export const deleteCategoryById = async (req, res) => {
  const id = parseId(req.params.id);
  await categoryService.deleteCategoryById(id);
  res.status(204).json(await categoryService.deleteCategoryById(id));
};
