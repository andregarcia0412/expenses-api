import {
  updateUserSchema,
  userResponseSchema,
} from "../../schemas/user/user.schema.js";
import {
  bearerAuth,
  error,
  jsonBody,
  ok,
  unauthorized,
  validationError,
} from "../common.js";

export const userPaths = {
  "/users": {
    get: {
      tags: ["Users"],
      summary: "Retorna o usuário autenticado",
      security: bearerAuth,
      responses: {
        200: ok("Dados do usuário", userResponseSchema),
        401: unauthorized,
        404: error("Usuário não encontrado"),
      },
    },
    patch: {
      tags: ["Users"],
      summary: "Atualiza o usuário autenticado",
      description: "Todos os campos são opcionais. A senha é armazenada com hash.",
      security: bearerAuth,
      requestBody: jsonBody(updateUserSchema),
      responses: {
        200: ok("Usuário atualizado", userResponseSchema),
        400: validationError(),
        401: unauthorized,
        404: error("Usuário não encontrado"),
        409: error("Email já está em uso"),
      },
    },
    delete: {
      tags: ["Users"],
      summary: "Remove o usuário autenticado",
      description: "Remove também todas as despesas do usuário.",
      security: bearerAuth,
      responses: {
        204: { description: "Usuário removido" },
        401: unauthorized,
        404: error("Usuário não encontrado"),
      },
    },
  },
};
