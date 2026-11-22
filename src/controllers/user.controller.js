import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/user/user.schema.js";
import {
  create,
  deleteById,
  findById,
  updateById,
} from "../services/user.service.js";
import { parseId } from "../utils/parse-id.js";

export const createUser = async (req, res) => {
  const data = createUserSchema.parse(req.body);
  res.status(201).json(await create(data));
};

export const findUserById = async (req, res) => {
  const id = parseId(req.params.id);
  res.status(200).json(await findById(id));
};

export const updateUserById = async (req, res) => {
  const id = parseId(req.params.id);
  const data = updateUserSchema.parse(req.body);
  res.status(200).json(await updateById(id, data));
};

export const deleteUserById = async (req, res) => {
  await deleteById(parseId(req.params.id));
  res.status(204).send();
};
