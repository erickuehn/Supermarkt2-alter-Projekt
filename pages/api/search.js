import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export default async function handler(req, res){
  const q = (req.query.q || '').toString().trim();
  if(!q) return res.status(400).json({ error: 'Missing query' });

  // Try DB (Prisma) first if DATABASE_URL present
  const dbUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_POSTGRES;
  if(dbUrl){
    try{
      // Attempt to use Prisma Price model (Postgres schema). If it fails, fall back.
      const results = await prisma.price.findMany({
        where: { productName: { contains: q, mode: 'insensitive' } },
        take: 50,
        select: { productName: true, aldi: true, lidl: true, penny: true, kaufland: true }
      });
      // Normalize decimals to numbers
      const out = results.map(r=>({ productName: r.productName, aldi: r.aldi!=null? Number(r.aldi):null, lidl: r.lidl!=null?Number(r.lidl):null, penny: r.penny!=null?Number(r.penny):null, kaufland: r.kaufland!=null?Number(r.kaufland):null }));
      return res.status(200).json(out);
    }catch(err){
      console.warn('Prisma search failed, falling back to local data', err.message || err);
      // continue to fallback
    }
  }

  // Fallback: use local JSON dataset in public/data/stores.json
  try{
    const fp = path.join(process.cwd(),'public','data','stores.json');
    const raw = fs.readFileSync(fp,'utf8');
    const json = JSON.parse(raw);
    const products = json.products || [];
    const matches = products.filter(p=> p.name && p.name.toLowerCase().includes(q.toLowerCase())).slice(0,50).map(p=>{
      // map to same shape
      const item = { productName: p.name };
      const prices = p.prices || {};
      item.aldi = prices.A || prices.aldi || null;
      item.lidl = prices.B || prices.lidl || null;
      item.penny = prices.C || prices.penny || null;
      item.kaufland = prices.K || prices.kaufland || null;
      return item;
    });
    return res.status(200).json(matches);
  }catch(err){
    console.error('Search fallback failed', err);
    return res.status(500).json({ error: 'Search unavailable' });
  }
}
