import { prisma } from "../src/server/db";

async function main() {
  const gwid = 332200;
  await prisma.character.upsert({
    where: {
      gwid,
    },
    create: {
      gwid,
      name: "test",
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
