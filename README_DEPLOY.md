Kurz: sichere Produktionseinrichtung (Deutsch)

1) Niemals harte DB‑Credentials in das Repo committen
- Lege sensible Werte in einer lokalen `.env` ab (diese ist in `.gitignore`).
- Committe stattdessen `.env.example` mit Platzhaltern (ist bereits vorhanden).

2) GitHub Actions / Vercel Secrets
- Trage folgende Secrets in GitHub (Repository → Settings → Secrets) bzw. in Vercel ein:
  - `DATABASE_URL` = deine Neon/Postgres URL (voll mit Nutzer/Passwort)
  - `JWT_SECRET` = starkes zufälliges Secret

3) Lokale Schritte (zsh)
```bash
# Erstelle eine lokale .env (NICHT committen)
cat > .env <<EOF
DATABASE_URL="postgresql://neondb_owner:REPLACE_WITH_PASSWORD@ep-...neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="a-very-strong-secret"
EOF

# Prisma Client generieren (gegen die .env)
export DATABASE_URL=$(grep DATABASE_URL .env | cut -d'=' -f2-)
npx prisma generate --schema=prisma/schema.postgres.prisma

# Migrations deployen (prod) und seed ausführen
export DATABASE_URL=$(grep DATABASE_URL .env | cut -d'=' -f2-)
npx prisma migrate deploy --schema=prisma/schema.postgres.prisma
node prisma/seed.js
```

4) CI (GitHub Actions)
- Stelle sicher, dass `DATABASE_URL` und `JWT_SECRET` als Secrets gesetzt sind. Dein Workflow `.github/workflows/prisma-deploy.yml` verwendet diese Umgebungsvariablen.

5) Wenn du möchtest, kann ich:
- die lokale `.env` hier erstellen (wird nicht committet), oder
- das Repo initialisieren und nur die nicht-geheimen Dateien committen (wenn du das wünschst).
