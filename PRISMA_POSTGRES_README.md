Prisma + Postgres (Neon) — quick guide

Goal
 - Prepare this repo to run Prisma against a Postgres database (Neon recommended for Vercel).

Files added
 - `prisma/schema.postgres.prisma` — Prisma schema configured for Postgres (same models as local schema).
 - `.env.example` — example env variables including `DATABASE_URL` and `JWT_SECRET`.

Local development (keep using SQLite)
 - The project currently ships a default `prisma/schema.prisma` which uses SQLite and local `prisma/dev.db`.
 - To continue local development, no changes are needed.

Switching to Postgres (production / Neon)
 1. Provision a Postgres database (Neon or other) and get the `DATABASE_URL` connection string.
 2. Add the `DATABASE_URL` (and `JWT_SECRET`) in your deployment environment (Vercel environment variables) or locally in a `.env` file for testing.
    - Example (DO NOT commit secrets):
      DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
      JWT_SECRET="very-long-random-secret"
 3. From your project root, run the Prisma migrate/generate commands pointing at the Postgres schema:
    ```bash
    # generate client for postgres schema
    npx prisma generate --schema=prisma/schema.postgres.prisma

    # create and apply migrations to the production DB (only run in controlled environments)
    npx prisma migrate deploy --schema=prisma/schema.postgres.prisma

    # or for dev/testing (will prompt / create migration locally)
    npx prisma migrate dev --schema=prisma/schema.postgres.prisma --name init
    ```

4. Seed the DB (if you have a seed script that uses Prisma client, run it using the generated client):
    ```bash
    DATABASE_URL="<your-postgres-url>" node prisma/seed.js
    ```

Notes
 - The migration files in `prisma/migrations/` were generated for SQLite; when switching to Postgres you may prefer to create a fresh migration set against Postgres using `prisma migrate dev` with the postgres schema.
 - In production, prefer `npx prisma migrate deploy` (no interactive prompts) during your CI/CD pipeline.
