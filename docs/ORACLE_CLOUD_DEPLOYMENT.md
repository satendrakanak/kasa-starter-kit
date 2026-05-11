# Oracle Cloud Live Demo Deployment

This guide is for hosting the KASA Starter Kit demo on one Oracle Cloud Always Free VM with Docker, PostgreSQL, Redis, NestJS, Next.js, and Caddy SSL.

## Recommended Demo Setup

Use one VM per product edition when possible:

- `starter.yourdomain.com` for KASA Starter Kit.
- `starter-api.yourdomain.com` for direct API and Swagger access.
- Later: `enterprise.yourdomain.com` and `enterprise-api.yourdomain.com` for the enterprise edition.

The starter stack uses:

- Caddy on ports `80` and `443`.
- Next.js client inside Docker.
- NestJS API inside Docker.
- PostgreSQL inside Docker.
- Redis inside Docker.

## What You Need From Oracle

Create an Oracle Cloud account and an Always Free compute VM.

Recommended shape:

- Image: Ubuntu 24.04 or Ubuntu 22.04.
- Shape: Ampere A1 ARM if available.
- Minimum: 2 OCPU, 8 GB RAM.
- Boot volume: 80 GB or more.
- Public IPv4: enabled.

Open these ports in the Oracle security list or network security group:

- `22` for SSH.
- `80` for HTTP and SSL certificate challenge.
- `443` for HTTPS.

Do not expose PostgreSQL, Redis, client port `3000`, or API port `8000` publicly.

## DNS Records

Point these records to the VM public IP:

```txt
starter.yourdomain.com      A      YOUR_ORACLE_VM_PUBLIC_IP
starter-api.yourdomain.com  A      YOUR_ORACLE_VM_PUBLIC_IP
```

Wait for DNS propagation before starting Caddy. You can check with:

```sh
dig starter.yourdomain.com
dig starter-api.yourdomain.com
```

## First-Time VM Setup

SSH into the VM:

```sh
ssh ubuntu@YOUR_ORACLE_VM_PUBLIC_IP
```

Install Docker:

```sh
sudo apt update
sudo apt install -y ca-certificates curl gnupg git ufw
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and SSH back in so Docker group permissions apply.

Enable the VM firewall:

```sh
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

## Deploy Starter Kit

Clone the repository:

```sh
git clone https://github.com/satendrakanak/kasa-starter-kit.git
cd kasa-starter-kit
```

Create the live env file:

```sh
cp deploy/oracle/.env.production.example deploy/oracle/.env.production
nano deploy/oracle/.env.production
```

Update at least these values:

```txt
STARTER_DOMAIN=starter.yourdomain.com
STARTER_API_DOMAIN=starter-api.yourdomain.com
ACME_EMAIL=you@yourdomain.com
NEXT_PUBLIC_APP_URL=https://starter.yourdomain.com
APP_URL=https://starter-api.yourdomain.com
FRONT_END_URL=https://starter.yourdomain.com
JWT_TOKEN_AUDIENCE=https://starter.yourdomain.com
JWT_TOKEN_ISSUER=https://starter-api.yourdomain.com
POSTGRES_PASSWORD=long-random-password
DATABASE_PASSWORD=same-long-random-password
JWT_SECRET=long-random-secret
APP_ENCRYPTION_KEY=long-random-secret
LICENSE_PORTAL_URL=https://license.yourdomain.com
```

Generate random secrets:

```sh
openssl rand -base64 48
openssl rand -base64 48
openssl rand -base64 48
```

Start the stack:

```sh
./scripts/oracle-live-up.sh
```

Check services:

```sh
cd deploy/oracle
docker compose --env-file .env.production -f docker-compose.starter.yml ps
docker compose --env-file .env.production -f docker-compose.starter.yml logs -f
```

Seed demo content:

```sh
cd ../..
./scripts/oracle-live-seed-demo.sh
```

Open:

- `https://starter.yourdomain.com`
- `https://starter-api.yourdomain.com/api`

Demo credentials:

```txt
Admin:   admin@kasa-starter-kit.demo / Demo@12345
Student: learner@kasa-starter-kit.demo / Demo@12345
```

## Updates

Pull latest code and rebuild:

```sh
cd ~/kasa-starter-kit
git pull origin master
./scripts/oracle-live-up.sh
```

Run demo seed again if demo data changed:

```sh
./scripts/oracle-live-seed-demo.sh
```

## Demo Reset

For a public demo, reset the content on a schedule so visitors cannot permanently break the demo.

Manual reset:

```sh
cd ~/kasa-starter-kit/deploy/oracle
docker compose --env-file .env.production -f docker-compose.starter.yml exec -T server \
  node dist/database/seed-production-demo-content.js
```

Cron example:

```sh
crontab -e
```

Add:

```cron
0 3 * * * cd /home/ubuntu/kasa-starter-kit && ./scripts/oracle-live-seed-demo.sh >> /home/ubuntu/kasa-starter-kit/demo-reset.log 2>&1
```

## Troubleshooting

Check Caddy SSL logs:

```sh
cd deploy/oracle
docker compose --env-file .env.production -f docker-compose.starter.yml logs caddy
```

Check API logs:

```sh
docker compose --env-file .env.production -f docker-compose.starter.yml logs server
```

Check client logs:

```sh
docker compose --env-file .env.production -f docker-compose.starter.yml logs client
```

Restart:

```sh
docker compose --env-file .env.production -f docker-compose.starter.yml restart
```

Stop:

```sh
docker compose --env-file .env.production -f docker-compose.starter.yml down
```

Do not run `down -v` unless you intentionally want to delete the database.
