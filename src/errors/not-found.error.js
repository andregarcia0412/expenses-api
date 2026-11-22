import { ApiError } from "./api.error.js";

export class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404, "NOT_FOUND");
  }
}
