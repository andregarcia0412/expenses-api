import { z } from "zod";
import { createDocument } from "zod-openapi";
import { ok } from "./common.js";
import { authPaths } from "./paths/auth.paths.js";
import { categoryPaths } from "./paths/category.paths.js";
import { expensePaths } from "./paths/expense.paths.js";
import { userPaths } from "./paths/user.paths.js";

const healthPaths = {
  "/": {
    get: {
      tags: ["Health"],
      summary: "Verifica se a API está no ar",
      responses: {
        200: ok("API funcionando", z.object({ status: z.literal("ok") })),
      },
    },
  },
};

export const openApiDocument = createDocument(
  {
    openapi: "3.1.0",
    info: {
      title: "Expenses API",
      version: "1.0.0",
      description: "API REST para controle de despesas.",
    },
    servers: [{ url: "/api/v1" }],
    tags: [
      { name: "Health" },
      { name: "Auth", description: "Cadastro e login" },
      { name: "Users", description: "Dados do usuário autenticado" },
      { name: "Categories", description: "Categorias de despesas" },
      { name: "Expenses", description: "Despesas do usuário autenticado" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    paths: {
      ...healthPaths,
      ...authPaths,
      ...userPaths,
      ...categoryPaths,
      ...expensePaths,
    },
  },
  {
    override: ({ jsonSchema, zodSchema, io }) => {
      if (zodSchema._zod.def.type === "date" && io === "output") {
        jsonSchema.type = "string";
        jsonSchema.format = "date-time";
      }
    },
  },
);
