import "dotenv/config";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized.error.js";

export const authMiddleware = (req, _res, next) => {
  const [scheme, token] = req.headers.authorization?.trim().split(/\s+/) ?? [];

  if (scheme?.toLowerCase() !== "bearer" || !token)
    throw new UnauthorizedError("Missing or malformed Authorization header");

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
    });
  } catch {
    throw new UnauthorizedError("Invalid or expired access token");
  }

  const userId = typeof payload === "string" ? NaN : Number(payload.sub);

  if (!Number.isInteger(userId) || userId <= 0)
    throw new UnauthorizedError("Invalid or expired access token");

  req.userId = userId;
  next();
};
