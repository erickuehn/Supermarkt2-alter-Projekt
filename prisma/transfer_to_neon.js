const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

async function main(){
  const p = path.join(__dirname, 'users.json');
  if(!fs.existsSync(p)){
    console.error('users.json not found at', p);
    process.exit(1);
  }

  const raw = fs.readFileSync(p, 'utf-8').trim();
  if(!raw){
    console.log('users.json is empty');
    return;
  }

  let users;
  try{
    users = JSON.parse(raw);
  }catch(e){
    // fallback: try to parse CSV-ish output
    console.error('Failed to parse users.json:', e);
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try{
    for(const u of users){
      const createdAt = u.createdAt ? (isNaN(Number(u.createdAt)) ? new Date(u.createdAt) : new Date(Number(u.createdAt))) : undefined;
      const createData = {
        id: u.id,
        email: u.email,
        name: u.name || null,
        password: u.password,
        createdAt: createdAt || undefined,
      };

      // Remove undefined fields (Prisma dislikes undefined explicit)
      Object.keys(createData).forEach(k => createData[k]===undefined && delete createData[k]);

      const updateData = {
        name: u.name || undefined,
        password: u.password || undefined,
      };
      Object.keys(updateData).forEach(k => updateData[k]===undefined && delete updateData[k]);

      const res = await prisma.user.upsert({
        where: { email: u.email },
        update: updateData,
        create: createData,
      });
      console.log('Upserted user:', res.email);
    }
    console.log('Done transferring', users.length, 'users.');
  }catch(e){
    console.error('Error during transfer:', e);
    process.exitCode = 1;
  }finally{
    await prisma.$disconnect();
  }
}

main();
