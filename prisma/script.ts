import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// type currentUser = User & Event;
async function main() {
  await prisma.user.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.location.deleteMany({});
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
