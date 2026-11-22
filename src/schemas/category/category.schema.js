import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().max(100),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});
