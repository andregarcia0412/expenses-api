import { z } from "zod";
import {
  createExpenseSchema,
  expenseResponseSchema,
  updateExpenseSchema,
} from "../../schemas/expense/expense.schema.js";
import {
  bearerAuth,
  error,
  idPathParams,
  jsonBody,
  ok,
  unauthorized,
  validationError,
} from "../common.js";

const notFound = error("Despesa não encontrada");
const invalidId = error("ID inválido");

export const expensePaths = {
  "/expenses": {
    post: {
      tags: ["Expenses"],
      summary: "Cria uma despesa para o usuário autenticado",
      security: bearerAuth,
      requestBody: jsonBody(createExpenseSchema),
      responses: {
        201: ok("Despesa criada", expenseResponseSchema),
        400: validationError("Dados inválidos ou categoria inexistente"),
        401: unauthorized,
      },
    },
    get: {
      tags: ["Expenses"],
      summary: "Lista as despesas do usuário autenticado",
      description: "Ordenadas por data (mais recente primeiro).",
      security: bearerAuth,
      requestParams: {
        query: z.object({
          categoryId: z
            .int()
            .positive()
            .optional()
            .meta({ description: "Filtra pelo ID da categoria", example: 1 }),
        }),
      },
      responses: {
        200: ok("Lista de despesas", z.array(expenseResponseSchema)),
        400: error("categoryId inválido"),
        401: unauthorized,
      },
    },
  },
  "/expenses/{id}": {
    get: {
      tags: ["Expenses"],
      summary: "Busca uma despesa pelo ID",
      security: bearerAuth,
      requestParams: { path: idPathParams },
      responses: {
        200: ok("Despesa encontrada", expenseResponseSchema),
        400: invalidId,
        401: unauthorized,
        404: notFound,
      },
    },
    put: {
      tags: ["Expenses"],
      summary: "Atualiza uma despesa",
      description: "Substitui todos os campos da despesa.",
      security: bearerAuth,
      requestParams: { path: idPathParams },
      requestBody: jsonBody(updateExpenseSchema),
      responses: {
        200: ok("Despesa atualizada", expenseResponseSchema),
        400: validationError("ID inválido, dados inválidos ou categoria inexistente"),
        401: unauthorized,
        404: notFound,
      },
    },
    delete: {
      tags: ["Expenses"],
      summary: "Remove uma despesa",
      security: bearerAuth,
      requestParams: { path: idPathParams },
      responses: {
        204: { description: "Despesa removida" },
        400: invalidId,
        401: unauthorized,
        404: notFound,
      },
    },
  },
};
