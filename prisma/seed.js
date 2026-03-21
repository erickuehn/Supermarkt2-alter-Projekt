const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Demo user: demo@demo.test / password
  const email = 'demo@demo.test';
  const name = 'Demo User';
  const plain = 'password';
  const hashed = await bcrypt.hash(plain, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      password: hashed,
    },
  });

  console.log('Seed completed: demo user created (email: demo@demo.test, pw: password)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
