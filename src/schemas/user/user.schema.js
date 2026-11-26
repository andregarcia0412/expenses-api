import { z } from "zod";

const userFields = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .meta({ description: "Nome do usuário", example: "Usuário Teste" }),
  email: z
    .email()
    .trim()
    .max(255)
    .meta({ description: "Email único do usuário", example: "teste@email.com" }),
  password: z
    .string()
    .min(6)
    .max(72)
    .meta({ description: "Senha (6 a 72 caracteres)", example: "123456" }),
});

export const createUserSchema = userFields.meta({ id: "CreateUserRequest" });

export const updateUserSchema = userFields
  .partial()
  .meta({ id: "UpdateUserRequest" });

export const userResponseSchema = z
  .object({
    id: z.number().meta({ example: 1 }),
    name: z.string().meta({ example: "Usuário Teste" }),
    email: z.string().meta({ example: "teste@email.com" }),
    createdAt: z.date().meta({ example: "2026-11-20T15:30:00.000Z" }),
  })
  .meta({ id: "User" });
