import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/user/user.schema.js";
import * as userService from "../services/user.service.js";
import { parseId } from "../utils/parse-id.js";

export const createUser = async (req, res) => {
  const data = createUserSchema.parse(req.body);
  res.status(201).json(await userService.create(data));
};

export const findUserById = async (req, res) => {
  const id = parseId(req.params.id);
  res.status(200).json(await userService.findById(id));
};

export const updateUserById = async (req, res) => {
  const id = parseId(req.params.id);
  const data = updateUserSchema.parse(req.body);
  res.status(200).json(await userService.updateById(id, data));
};

export const deleteUserById = async (req, res) => {
  await userService.deleteById(parseId(req.params.id));
  res.status(204).send();
};
