#!/usr/bin/env node
// scripts/check_neon_db.js
// Usage: DATABASE_URL="postgresql://..." node scripts/check_neon_db.js

const { Client } = require('pg');

async function run() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('ERROR: Please set DATABASE_URL environment variable.');
    process.exit(2);
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();
  console.log('Connected to DB. Running checks...');

  const checks = [
    {
      name: 'Count products',
      sql: "SELECT COUNT(*)::int AS cnt FROM public.prices;",
      handle: rows => ({ ok: true, msg: `${rows[0].cnt} rows in public.prices` }),
    },
    {
      name: 'Products with no price anywhere',
      sql: `SELECT COUNT(*)::int AS cnt FROM public.prices WHERE (aldi IS NULL OR aldi=0) AND (lidl IS NULL OR lidl=0) AND (penny IS NULL OR penny=0) AND (kaufland IS NULL OR kaufland=0);`,
      handle: rows => ({ ok: rows[0].cnt === 0, msg: `${rows[0].cnt} products have all prices NULL/0` }),
    },
    {
      name: 'Duplicate product names',
      sql: `SELECT product_name, COUNT(*) AS c FROM public.prices GROUP BY product_name HAVING COUNT(*) > 1;`,
      handle: rows => ({ ok: rows.length === 0, msg: rows.length ? `Found ${rows.length} duplicate product names` : 'No duplicate product names' }),
    },
    {
      name: 'Negative prices',
      sql: `SELECT product_name, aldi, lidl, penny, kaufland FROM public.prices WHERE (aldi < 0) OR (lidl < 0) OR (penny < 0) OR (kaufland < 0) LIMIT 20;`,
      handle: rows => ({ ok: rows.length === 0, msg: rows.length ? `Found ${rows.length} rows with negative prices` : 'No negative prices found', data: rows }),
    },
    {
      name: 'Empty product names',
      sql: `SELECT COUNT(*)::int AS cnt FROM public.prices WHERE product_name IS NULL OR trim(product_name) = '';`,
      handle: rows => ({ ok: rows[0].cnt === 0, msg: `${rows[0].cnt} empty product_name` }),
    },
    {
      name: 'Price history exists',
      sql: `SELECT COUNT(*)::int AS cnt FROM public.price_history;`,
      handle: rows => ({ ok: true, msg: `price_history rows: ${rows[0].cnt}` }),
    },
    {
      name: 'Triggers on prices',
      sql: `SELECT tgname, tgenabled FROM pg_trigger WHERE tgrelid = 'public.prices'::regclass AND NOT tgisinternal;`,
      handle: rows => ({ ok: rows.length > 0, msg: rows.length ? `Triggers: ${rows.map(r=>r.tgname).join(', ')}` : 'No triggers found on public.prices', data: rows }),
    },
    {
      name: 'Schema: columns in prices',
      sql: `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'prices' ORDER BY ordinal_position;`,
      handle: rows => ({ ok: rows.length > 0, msg: `Found ${rows.length} columns`, data: rows }),
    },
    {
      name: 'Sample: Milch',
      sql: `SELECT * FROM public.prices WHERE product_name ILIKE '%milch%' LIMIT 5;`,
      handle: rows => ({ ok: true, msg: `Sample rows: ${rows.length}`, data: rows }),
    },
  ];

  let overallOk = true;
  for (const chk of checks) {
    try {
      const res = await client.query(chk.sql);
      const result = chk.handle(res.rows);
      const status = result.ok ? 'OK' : 'ERROR';
      if (!result.ok) overallOk = false;
      console.log(`\n[${status}] ${chk.name}`);
      console.log(result.msg);
      if (result.data) console.table(result.data.slice(0, 20));
    } catch (err) {
      overallOk = false;
      console.error(`\n[ERROR] ${chk.name} -- query failed:`);
      console.error(err.message);
    }
  }

  await client.end();
  console.log('\nChecks completed. Overall status:', overallOk ? 'OK' : 'ISSUES FOUND');
  process.exit(overallOk ? 0 : 3);
}

run().catch(err => {
  console.error('Fatal error connecting to DB:', err.message);
  process.exit(2);
});
