import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-please-change';

export default async function handler(req, res){
  const cookie = req.headers.cookie || '';
  const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('token='));
  if(!match) return res.status(401).json({ error: 'Not authenticated' });
  const token = match.split('=')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if(!user) return res.status(200).json({ ok:true, user: { id: payload.sub, email: payload.email, name: payload.name } });
    return res.status(200).json({ ok:true, user: { id: user.id, email: user.email, name: user.name } });
  }catch(err){
    console.error('me endpoint error', err);
    return res.status(401).json({ error:'Invalid token' });
  }
}
