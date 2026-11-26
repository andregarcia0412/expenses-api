import { z } from "zod";
import { categoryResponseSchema } from "../../schemas/category/category.schema.js";
import { bearerAuth, ok, unauthorized } from "../common.js";

export const categoryPaths = {
  "/categories": {
    get: {
      tags: ["Categories"],
      summary: "Lista todas as categorias",
      security: bearerAuth,
      responses: {
        200: ok("Lista de categorias", z.array(categoryResponseSchema)),
        401: unauthorized,
      },
    },
  },
};
