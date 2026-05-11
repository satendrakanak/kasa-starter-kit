#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
PACKAGE_NAME="kasa-starter-kit-envato"
BUILD_DIR="$ROOT_DIR/.temp/$PACKAGE_NAME"
ZIP_PATH="$ROOT_DIR/.temp/$PACKAGE_NAME.zip"

rm -rf "$BUILD_DIR" "$ZIP_PATH"
mkdir -p "$BUILD_DIR"

copy_path() {
  src="$1"
  dest="$BUILD_DIR/$1"
  mkdir -p "$(dirname "$dest")"
  cp -R "$ROOT_DIR/$src" "$dest"
}

copy_path "client"
copy_path "server"
copy_path "scripts"
copy_path "docs"
copy_path "screenshots"
copy_path "README.md"
copy_path "Makefile"
copy_path "docker-compose.yml"
copy_path "docker-compose.prod.yml"
copy_path ".env.docker.example"
copy_path ".env.production.example"
copy_path ".env.production.local.example"
copy_path ".envatoignore"
copy_path "kasa-starter-kit"

find "$BUILD_DIR" \
  \( -name node_modules -o -name .next -o -name dist -o -name build -o -name coverage -o -name .git -o -name .kasa -o -name .kasa-starter-kit \) \
  -prune -exec rm -rf {} +

rm -rf "$BUILD_DIR/server/tmp" "$BUILD_DIR/tmp"

find "$BUILD_DIR" \
  \( -name ".env" -o -name ".env.docker" -o -name ".env.production" -o -name ".env.production.local" -o -name "*.log" -o -name ".DS_Store" -o -name "*.tsbuildinfo" \) \
  -delete

mkdir -p "$ROOT_DIR/.temp"
(
  cd "$ROOT_DIR/.temp"
  zip -qr "$ZIP_PATH" "$PACKAGE_NAME"
)

echo "Created Envato package:"
echo "  $ZIP_PATH"
