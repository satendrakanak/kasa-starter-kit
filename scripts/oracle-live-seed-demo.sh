#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
ORACLE_DIR="$ROOT_DIR/deploy/oracle"
ENV_FILE="$ORACLE_DIR/.env.production"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  echo "Create it from deploy/oracle/.env.production.example first."
  exit 1
fi

cd "$ORACLE_DIR"

docker compose \
  --env-file "$ENV_FILE" \
  -f docker-compose.starter.yml \
  exec -T server \
  node dist/database/seed-production-demo-content.js
