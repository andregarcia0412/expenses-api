export const seedCategories = async (prisma) => {
  await prisma.category.createMany({
    data: [
      { name: "Alimentação" },
      { name: "Transporte" },
      { name: "Moradia" },
      { name: "Lazer" },
      { name: "Saúde" },
      { name: "Educação" },
    ],
  });
};
