# Neon / Postgres SQL for prices table

This folder contains `neon_create_prices_table.sql` — a resilient Postgres schema and seed for the supermarket prices table.

Quick steps to run against Neon (recommended):

1. Obtain your Neon `DATABASE_URL` (from Neon dashboard or environment variable). It should look like a Postgres connection string.

2. Run the SQL file with psql (local machine) or any SQL client. Example using psql:

```bash
export DATABASE_URL="postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require"
psql "$DATABASE_URL" -f sql/neon_create_prices_table.sql
```

3. The file creates:
- `public.prices` — current prices with a unique constraint on `product_name` and checks for non-negative prices.
- `public.price_history` — append-only audit table populated by a trigger on changes.

Notes on resilience
- The schema uses a unique constraint on `product_name` so seeds are idempotent.
- The `price_history` audit table preserves all changes for recovery and forensic inspection.
- Add regular backups / scheduled exports from Neon for disaster recovery.
- For high-frequency updates consider batching updates and using `INSERT ... ON CONFLICT ... DO UPDATE` with optimistic `version` incrementing.

Applying via Prisma
- If you use Prisma with Neon, prefer adding the model to `prisma/schema.postgres.prisma` and using `prisma migrate` / `prisma db push` so Prisma can manage migrations. Alternatively, run this SQL directly against the Neon DB.

Rollback & migrations
- For production workflows, create a proper migration file (git-controlled) and test on a staging branch of your Neon DB before applying to production.

If you want, I can also:
- Create a Prisma model + migration for this schema.
- Generate a small script to upsert/update prices from a CSV.

