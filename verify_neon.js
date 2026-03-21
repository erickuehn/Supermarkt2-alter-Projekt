const { PrismaClient } = require('@prisma/client');

(async function(){
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { email: 'demo@demo.test' } });
    console.log(JSON.stringify(user, null, 2));
  } catch (e) {
    console.error('Error querying Neon DB:', e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
