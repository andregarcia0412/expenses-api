import { ApiError } from "./api.error.js";

export class BadRequestError extends ApiError {
  constructor(message) {
    super(message, 400, "BAD_REQUEST");
  }
}
