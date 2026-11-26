import { loginResponseSchema, loginSchema } from "../../schemas/auth/auth.schema.js";
import {
  createUserSchema,
  userResponseSchema,
} from "../../schemas/user/user.schema.js";
import { error, jsonBody, ok, validationError } from "../common.js";

export const authPaths = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Autentica um usuário",
      description: "Retorna um access token JWT para uso nas rotas protegidas.",
      requestBody: jsonBody(loginSchema),
      responses: {
        200: ok("Login realizado com sucesso", loginResponseSchema),
        400: validationError(),
        401: error("Email ou senha incorretos"),
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Cadastra um novo usuário",
      requestBody: jsonBody(createUserSchema),
      responses: {
        201: ok("Usuário criado", userResponseSchema),
        400: validationError(),
        409: error("Email já está em uso"),
      },
    },
  },
};
