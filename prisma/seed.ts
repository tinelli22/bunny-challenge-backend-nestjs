import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //await prisma.user.deleteMany();

  console.log('Seeding...');

  const userSeed = await prisma.user.create({
    data: {
      email: 'email@bunnysw.com.br',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });

  console.log({ userSeed });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
