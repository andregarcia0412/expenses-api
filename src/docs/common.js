import { z } from "zod";

export const errorResponseSchema = z
  .object({
    message: z.string().meta({ example: "Resource not found" }),
    statusMessage: z.string().meta({ example: "NOT_FOUND" }),
  })
  .meta({ id: "ErrorResponse" });

export const validationErrorResponseSchema = z
  .object({
    message: z.string().meta({ example: "Validation failed" }),
    statusMessage: z.literal("BAD_REQUEST"),
    errors: z
      .record(z.string(), z.array(z.string()))
      .meta({
        description: "Erros de validação agrupados por campo",
        example: { email: ["Invalid email address"] },
      }),
  })
  .meta({ id: "ValidationErrorResponse" });

export const idPathParams = z.object({
  id: z
    .int()
    .positive()
    .max(2_147_483_647)
    .meta({ description: "ID do recurso", example: 1 }),
});

export const bearerAuth = [{ bearerAuth: [] }];

const json = (schema) => ({ "application/json": { schema } });

export const jsonBody = (schema) => ({ required: true, content: json(schema) });

export const ok = (description, schema) => ({ description, content: json(schema) });

export const error = (description) => ({
  description,
  content: json(errorResponseSchema),
});

export const validationError = (description = "Dados inválidos") => ({
  description,
  content: json(z.union([validationErrorResponseSchema, errorResponseSchema])),
});

export const unauthorized = error("Token ausente, malformado, inválido ou expirado");
