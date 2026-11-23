import { prisma } from "../../src/lib/prisma.js";
import { seedCategories } from "./category.seed.js";
import { seedUsers } from "./user.seed.js";

const main = async () => {
  await seedCategories(prisma);
  await seedUsers(prisma);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
