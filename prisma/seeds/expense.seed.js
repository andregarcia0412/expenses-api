export const seedExpenses = async (prisma) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: "teste@email.com" },
  });

  const existing = await prisma.expense.count({ where: { userId: user.id } });
  if (existing > 0) return;

  const categories = await prisma.category.findMany({
    where: { name: { in: ["Alimentação", "Transporte", "Lazer"] } },
  });

  const categoryId = (name) => {
    const category = categories.find((c) => c.name === name);
    if (!category) throw new Error(`Category "${name}" not found`);
    return category.id;
  };

  await prisma.expense.createMany({
    data: [
      {
        description: "Almoço no restaurante",
        amount: 45.9,
        date: new Date("2026-11-10"),
        userId: user.id,
        categoryId: categoryId("Alimentação"),
      },
      {
        description: "Uber para o trabalho",
        amount: 23.5,
        date: new Date("2026-11-15"),
        userId: user.id,
        categoryId: categoryId("Transporte"),
      },
      {
        description: "Ingresso de cinema",
        amount: 32.0,
        date: new Date("2026-11-20"),
        userId: user.id,
        categoryId: categoryId("Lazer"),
      },
    ],
  });
};
