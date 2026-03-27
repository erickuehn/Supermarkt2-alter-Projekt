# Prisma migration instructions for Neon/Postgres

This file explains how to create and apply a Prisma migration for the `Price` and `PriceHistory` models in `prisma/schema.postgres.prisma`.

1) Ensure you have a local `.env` with a `DATABASE_URL` pointing to your Neon branch/DB (do NOT commit this file):

```bash
# example (replace with your Neon values)
export DATABASE_URL="postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require"
```

2) Install dependencies / generate Prisma client (if not done yet):

```bash
npm install
npx prisma generate
```

3) Create a migration (development):

```bash
npx prisma migrate dev --name add_prices_table
```

This will create a migration in `prisma/migrations` and apply it to the database referenced by `DATABASE_URL`.

4) Seed the prices (optional):

```bash
node prisma/seed_prices.js
```

5) For production deployment (CI): use `prisma migrate deploy` against the production DATABASE_URL.

Notes and caveats
- If you prefer, you can run the `sql/neon_create_prices_table.sql` directly against your Neon DB via `psql` instead of using Prisma migrations.
- Prisma's Decimal type maps to Postgres `numeric`/`decimal`. Make sure the @prisma/client version in `package.json` supports Decimal on your Node version.
- Keep backups and test migrations on a staging DB before applying to production.

If you want, I can run `npx prisma migrate dev` here — but I need a working `DATABASE_URL` in the environment. It's safer for you to run it locally with your Neon credentials.
