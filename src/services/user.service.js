import { ConflictError } from "../errors/conflict.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { prisma } from "../lib/prisma.js";
import { userResponseSchema } from "../schemas/user/user.schema.js";

export const create = async (data) => {
  if (await prisma.user.findUnique({ where: { email: data.email } })) {
    throw new ConflictError("Email already in use");
  }

  return userResponseSchema.parse(await prisma.user.create({ data }));
};

export const findById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new NotFoundError("User not found");
  return userResponseSchema.parse(user);
};

export const updateById = async (id, data) => {
  return userResponseSchema.parse(
    await prisma.user.update({ where: { id }, data }),
  );
};

export const deleteById = async (id) => {
  await prisma.user.delete({ where: { id } });
};
