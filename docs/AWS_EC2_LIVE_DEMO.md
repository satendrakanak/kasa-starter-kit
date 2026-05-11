# AWS EC2 Live Demo Deployment

This guide is for hosting the KASA Starter Kit demo on one AWS EC2 Ubuntu instance with Docker, PostgreSQL, Redis, NestJS, Next.js, and Caddy SSL.

## Recommended EC2 Size

- Minimum for a live demo: 2 vCPU and 4 GB RAM.
- Recommended: `c7i-flex.large`, `m7i-flex.large`, `t3.medium`, or better.
- `t3.micro` is not recommended for this Docker stack because the production build can run out of memory.

## Security Group

Open inbound TCP ports:

- `22` from your IP for SSH.
- `80` from anywhere for HTTP and Let's Encrypt.
- `443` from anywhere for HTTPS.

## DNS

Point two records to the EC2 public IPv4 address:

```text
starter.yourdomain.com      A      YOUR_EC2_PUBLIC_IP
starter-api.yourdomain.com  A      YOUR_EC2_PUBLIC_IP
```

For a temporary demo without a domain, use `sslip.io`:

```text
starter.YOUR_EC2_PUBLIC_IP.sslip.io
starter-api.YOUR_EC2_PUBLIC_IP.sslip.io
```

## Server Setup

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git ufw
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and back in after adding the Docker group.

## Deploy

```bash
git clone https://github.com/satendrakanak/kasa-starter-kit.git
cd kasa-starter-kit
cp deploy/aws/.env.production.example deploy/aws/.env.production
nano deploy/aws/.env.production
./scripts/aws-live-up.sh
./scripts/aws-live-seed-demo.sh
```

## Useful Commands

```bash
cd deploy/aws
docker compose --env-file .env.production -f docker-compose.starter.yml ps
docker compose --env-file .env.production -f docker-compose.starter.yml logs -f
docker compose --env-file .env.production -f docker-compose.starter.yml restart
```
