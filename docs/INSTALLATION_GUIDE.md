# kasa-starter-kit Installation Guide

This guide is written for buyers who receive the product ZIP from Envato or a direct marketplace sale.

## Requirements

- Docker Desktop or Docker Engine with Docker Compose plugin.
- 4 GB RAM minimum for development, 8 GB recommended.
- Ports `3000`, `8000`, and `5433` available for local setup.
- A valid kasa-starter-kit license key.
- Optional: SMTP credentials, S3-compatible storage credentials, Razorpay or Stripe credentials.

## Local Installation

1. Extract the ZIP.

2. Open a terminal in the extracted folder.

3. Register the helper command:

```bash
./scripts/register-kasa-starter-kit-command.sh
```

4. Start the development installer:

```bash
kasa-starter-kit install dev
```

5. Open the installer:

```text
http://localhost:3000/install
```

6. Complete the wizard:

- Select bundled database or connect an external PostgreSQL database.
- Enter academy name, support email, and support phone.
- Enter the license key.
- Create the first admin account.
- Optionally import starter demo data.

7. Open the application:

```text
http://localhost:3000
```

The API is available at:

```text
http://localhost:8000
```

Swagger API docs are available at:

```text
http://localhost:8000/api
```

## Useful Commands

```bash
kasa-starter-kit start dev
kasa-starter-kit restart dev
kasa-starter-kit stop
kasa-starter-kit install dev -r
```

Use `install dev -r` only when you want a fresh local database and installer reset.

## Production Test On Local Machine

Run this before uploading to a server:

```bash
kasa-starter-kit stop
kasa-starter-kit install app
kasa-starter-kit start app
```

This builds and runs the production Docker targets locally.

## Server Deployment Summary

1. Copy `docker-compose.prod.yml` and `.env.production` to the server.
2. Create `.env.production` from `.env.production.example`.
3. Set real domain, database, Redis, JWT, encryption, license, mail, storage, and payment values.
4. Run:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

5. Open your domain and complete `/install`.

For full deployment notes, read `docs/INFRA_AND_DEPLOYMENT.md`.

## Branding

Default KASA logos are included:

- Light logo: `client/public/assets/kasa-logo-light.png`
- Dark logo: `client/public/assets/kasa-logo-dark.png`

Admins can replace logo, footer logo, favicon, and panel icon from Admin -> Settings -> Site.

## Troubleshooting

- If ports are busy, stop the other app or change port mappings in `.env.docker`.
- If Docker build is slow or exits with code `137`, increase Docker memory.
- If external database setup fails, create the empty database first and re-test from the installer.
- If license activation fails in Docker while the license portal runs on your host machine, keep `LICENSE_PORTAL_URL=http://localhost:5000`; the API rewrites it internally for Docker.
- If email does not send, configure SMTP from Admin -> Settings -> Site.
