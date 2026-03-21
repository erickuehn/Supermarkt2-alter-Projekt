import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-please-change';
const TOKEN_NAME = 'token';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  if(!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  try{
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = { sub: user.id, email: user.email, name: user.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    const cookie = serialize(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  }catch(err){
    console.error('login error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
