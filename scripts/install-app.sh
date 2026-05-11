#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env.production.local ]; then
  cp .env.production.local.example .env.production.local
  echo "Created .env.production.local from .env.production.local.example"
else
  echo ".env.production.local already exists"
fi

echo "Starting kasa-starter-kit production test stack..."
docker compose --env-file .env.production.local -f docker-compose.prod.yml up --build -d

echo ""
echo "kasa-starter-kit production test stack is running."
echo "Open the installer and complete setup:"
echo "  http://localhost:3000/install"
echo ""
echo "Useful URLs:"
echo "  App:     http://localhost:3000"
echo "  API:     http://localhost:8000"
echo "  Swagger: http://localhost:8000/api"
echo ""
echo "Logs:"
echo "  make prod-logs"
echo ""
echo "Stop all kasa-starter-kit containers:"
echo "  kasa-starter-kit stop"
echo ""
echo "Start this stack again later:"
echo "  kasa-starter-kit start app"
echo ""
echo "Restart after external database selection:"
echo "  kasa-starter-kit restart app"
