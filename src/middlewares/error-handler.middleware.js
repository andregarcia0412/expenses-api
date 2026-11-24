import { z, ZodError } from "zod";
import { ApiError } from "../errors/api.error.js";
import { Prisma } from "../generated/prisma/client.ts";

export const errorHandlerMiddleware = (err, _req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof ApiError)
    return send(res, err.message, err.statusCode, err.statusMessage);

  if (err instanceof Prisma.PrismaClientKnownRequestError)
    return handlePrismaError(err, res);

  if (err instanceof ZodError) {
    const { formErrors, fieldErrors } = z.flattenError(err);
    return res.status(400).json({
      message: formErrors[0] ?? "Validation failed",
      statusMessage: "BAD_REQUEST",
      errors: fieldErrors,
    });
  }

  if (isJsonParseError(err))
    return send(res, "Invalid JSON body", 400, "BAD_REQUEST");

  console.error("Unhandled error", err);
  return send(res, "Internal server error", 500, "INTERNAL_SERVER_ERROR");
};

const handlePrismaError = (err, res) => {
  switch (err.code) {
    case "P2002":
      return send(res, "Resource already exists", 409, "CONFLICT");
    case "P2025":
      return send(res, "Resource not found", 404, "NOT_FOUND");
    default:
      console.error("Unhandled Prisma error", { code: err.code, err });
      return send(res, "Internal server error", 500, "INTERNAL_SERVER_ERROR");
  }
};

const isJsonParseError = (err) => err?.type === "entity.parse.failed";

const send = (res, message, statusCode, statusMessage) =>
  res.status(statusCode).json({ message, statusMessage });
