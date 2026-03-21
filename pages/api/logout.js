import { serialize } from 'cookie';

const TOKEN_NAME = 'token';

export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const cookie = serialize(TOKEN_NAME, '', { httpOnly:true, secure: process.env.NODE_ENV === 'production', sameSite:'lax', path:'/', maxAge: 0 });
  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ ok:true });
}
