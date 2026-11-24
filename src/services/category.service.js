import { ConflictError } from "../errors/conflict.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { prisma } from "../lib/prisma.js";
import { categoryResponseSchema } from "../schemas/category/category.schema.js";

export const create = async (data) => {
  if (
    await prisma.category.findUnique({
      where: { name: data.name },
    })
  )
    throw new ConflictError("This category already exists");

  return categoryResponseSchema.parse(await prisma.category.create({ data }));
};

export const findCategoryById = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) throw new NotFoundError("Category not found");
  return category;
};

export const listCategories = async () => {
  return (await prisma.category.findMany()).map((category) =>
    categoryResponseSchema.parse(category),
  );
};

export const updateCategoryById = async (id, data) => {
  return categoryResponseSchema.parse(
    await prisma.category.update({ where: { id }, data }),
  );
};

export const deleteCategoryById = async (id) => {
  await prisma.category.delete({ where: { id } });
};
