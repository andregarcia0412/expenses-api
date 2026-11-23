import { ApiError } from "./api.error.js";

export class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, 401, "UNAUTHORIZED");
  }
}
