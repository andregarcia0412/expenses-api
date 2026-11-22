import { BadRequestError } from "../errors/bad-request.error.js";

const MAX_INT = 2_147_483_647;

export const parseId = (raw) => {
  if (!/^\d+$/.test(raw)) throw new BadRequestError("Invalid id");

  const id = Number(raw);

  if (id <= 0 || id > MAX_INT) throw new BadRequestError("Invalid id");
  return id;
};
