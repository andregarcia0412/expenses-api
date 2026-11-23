import * as bcrypt from "bcrypt";

export const seedUsers = async (prisma) => {
  await prisma.user.create({
    data: {
      name: "Usuário Teste",
      email: "teste@email.com",
      password: await bcrypt.hash("123456", 10),
    },
  });
};
