import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .max(255)
      .meta({ description: "Email do usuário", example: "teste@email.com" }),
    password: z
      .string()
      .max(72)
      .meta({ description: "Senha do usuário", example: "123456" }),
  })
  .meta({ id: "LoginRequest" });

export const loginResponseSchema = z
  .object({
    accessToken: z.string().meta({
      description: "JWT a ser enviado no header Authorization: Bearer <token>",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
  })
  .meta({ id: "LoginResponse" });
