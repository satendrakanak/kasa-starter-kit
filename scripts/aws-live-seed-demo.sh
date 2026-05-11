#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
AWS_DIR="$ROOT_DIR/deploy/aws"
ENV_FILE="$AWS_DIR/.env.production"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  echo "Create it from deploy/aws/.env.production.example first."
  exit 1
fi

cd "$AWS_DIR"

docker compose \
  --env-file "$ENV_FILE" \
  -f docker-compose.starter.yml \
  exec -T server \
  node dist/database/seed-production-demo-content.js
