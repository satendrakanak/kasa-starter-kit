# kasa-starter-kit

kasa-starter-kit is a full-stack learning platform starter built with Next.js, NestJS, PostgreSQL, Redis, and Docker.

The goal of this repository is to give you a clean, ready-to-run LMS foundation with the core workflows most course businesses need: authentication, course management, paid enrollment, student learning, progress tracking, certificates, basic CMS settings, and an installation wizard.

## Starter Scope

Included in the starter kit:

- Authentication with login, registration, email verification, password reset, and optional social auth settings.
- Two core roles: Admin and Student.
- Course management with categories, sections, chapters, video lessons, PDF/file attachments, thumbnails, and free/paid toggles.
- Student learning dashboard with my courses, continue watching, progress tracking, completed lessons, orders, and certificates.
- Certificate generation after course completion with a simple template foundation.
- Payments with Razorpay-ready checkout and coupon support.
- Admin dashboard for courses, users, orders, coupons, certificates, media, settings, and basic sales overview.
- Basic CMS through site settings, course content, instructor/course metadata, landing page data, articles, testimonials, contact leads, and media assets.
- License activation through the kasa-starter-kit Licence Portal.
- Installation wizard for database setup, site details, license activation, first admin creation, demo data import, and production readiness checks.

Kept as extension code but disabled from the starter navigation and frontend routes:

- Faculty workspace, live classes, recordings, batches, exams, question bank, engagement automation, refunds, moderation, and advanced reviews.

These modules can be restored in a larger edition without rebuilding the foundation.

## Quick Start

Fresh clone flow:

```bash
./scripts/register-kasa-starter-kit-command.sh
kasa-starter-kit install dev
```

Then open:

- Installer: http://localhost:3000/install
- App: http://localhost:3000
- API: http://localhost:8000
- Swagger: http://localhost:8000/api

The first run opens the installation wizard. It checks the database, saves academy details, activates the license key through the kasa-starter-kit Licence Portal, creates the first admin user, and can import starter demo data.

For local testing, run the kasa-starter-kit Licence Portal on port `5000`, generate a `kasa-starter-kit` key there, and keep `LICENSE_PORTAL_URL=http://localhost:5000`. When the API runs inside Docker, localhost is routed to the host machine internally.

Local PostgreSQL is exposed on host port `5433` by default so it does not clash with Postgres already running on your machine. The app containers still connect to Postgres on container port `5432`.

## Commands

```bash
kasa-starter-kit install dev
kasa-starter-kit install dev -r
kasa-starter-kit install app
kasa-starter-kit start dev
kasa-starter-kit start app
kasa-starter-kit stop
kasa-starter-kit restart dev
kasa-starter-kit restart app

make install-dev
make install-app
make dev
make dev-down
make prod
make prod-down
```

What they do:

- `kasa-starter-kit install dev`: creates `.env.docker` if needed, starts the development stack, and prints setup URLs.
- `kasa-starter-kit install dev -r`: resets the bundled Docker database and starts a fresh installer.
- `kasa-starter-kit install app`: creates `.env.production.local` if needed and starts the local production-test stack.
- `kasa-starter-kit start dev`: starts an already-installed development stack.
- `kasa-starter-kit start app`: starts an already-installed local production-test stack.
- `kasa-starter-kit stop`: stops both development and local production-test stacks.
- `kasa-starter-kit restart dev` / `kasa-starter-kit restart app`: restarts the selected stack after config changes.

Raw Docker command:

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build
```

## Project Structure

```text
kasa-starter-kit/
  client/   Next.js frontend
  server/   NestJS API
  scripts/  Local install/start/stop helpers
  docs/     Deployment and storage notes
```

## Environment

Use `.env.docker.example` for local Docker development and `.env.production.example` for production deployments.

Important values:

- `DATABASE_*`: PostgreSQL connection used by the API.
- `REDIS_*`: queue/cache connection used by background jobs.
- `JWT_*`: auth token configuration.
- `APP_ENCRYPTION_KEY`: encryption secret for stored integration settings.
- `LICENSE_PORTAL_URL`: kasa-starter-kit Licence Portal URL for product activation.
- `LICENSE_PRODUCT_SLUG`: product slug used by the licence portal, default `kasa-starter-kit`.
- `NEXT_PUBLIC_APP_URL`: public frontend URL.
- `NEXT_PUBLIC_API_BASE_URL`: API base URL used by the frontend.

## Installation Wizard

The installer supports:

- Bundled Docker PostgreSQL.
- External PostgreSQL connection testing and saving.
- Site name, tagline, support email, and support phone setup.
- License key validation and activation.
- First admin account creation.
- Optional starter demo data import.

For external databases, create the empty database first, then enter host, port, database name, username, password, and SSL preference in the installer. After saving an external database, restart the stack with `kasa-starter-kit restart dev` or `kasa-starter-kit restart app`, then reopen `/install`.

The selected external database is stored locally in `.kasa-starter-kit/database.json`. This file is ignored by Git and should not be committed.

## Docs

- Infrastructure and deployment: [docs/INFRA_AND_DEPLOYMENT.md](./docs/INFRA_AND_DEPLOYMENT.md)
- Oracle Cloud live demo deployment: [docs/ORACLE_CLOUD_DEPLOYMENT.md](./docs/ORACLE_CLOUD_DEPLOYMENT.md)
- AWS S3 and CloudFront storage: [docs/AWS_STORAGE_SETUP.md](./docs/AWS_STORAGE_SETUP.md)
- Marketplace packaging: [docs/MARKETPLACE_PACKAGING.md](./docs/MARKETPLACE_PACKAGING.md)
- Envato submission notes: [docs/ENVATO_SUBMISSION.md](./docs/ENVATO_SUBMISSION.md)
- Buyer installation guide: [docs/INSTALLATION_GUIDE.md](./docs/INSTALLATION_GUIDE.md)
- Screenshot guide: [docs/SCREENSHOTS.md](./docs/SCREENSHOTS.md)
- Changelog: [docs/CHANGELOG.md](./docs/CHANGELOG.md)
- Starter scope notes: [docs/STARTER_KIT_SCOPE.md](./docs/STARTER_KIT_SCOPE.md)
