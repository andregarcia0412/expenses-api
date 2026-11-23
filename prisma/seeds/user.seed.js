import * as bcrypt from "bcrypt";

export const seedUsers = async (prisma) => {
  await prisma.user.upsert({
    where: { email: "teste@email.com" },
    update: {},
    create: {
      name: "Usuário Teste",
      email: "teste@email.com",
      password: await bcrypt.hash("123456", 10),
    },
  });
};
