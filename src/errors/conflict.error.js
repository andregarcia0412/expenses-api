import { ApiError } from "./api.error.js";

export class ConflictError extends ApiError {
  constructor(message) {
    super(message, 409, "CONFLICT");
  }
}
