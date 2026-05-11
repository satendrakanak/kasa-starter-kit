#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
TARGET="$ROOT_DIR/kasa-starter-kit"

if [ ! -x "$TARGET" ]; then
  chmod +x "$TARGET"
fi

if [ -w /usr/local/bin ]; then
  ln -sf "$TARGET" /usr/local/bin/kasa-starter-kit
  echo "Registered kasa-starter-kit command at /usr/local/bin/kasa-starter-kit"
  echo "You can now run: kasa-starter-kit install dev"
  exit 0
fi

LOCAL_BIN="$HOME/.local/bin"
mkdir -p "$LOCAL_BIN"
ln -sf "$TARGET" "$LOCAL_BIN/kasa-starter-kit"

echo "Registered kasa-starter-kit command at $LOCAL_BIN/kasa-starter-kit"
case ":$PATH:" in
  *":$LOCAL_BIN:"*)
    echo "You can now run: kasa-starter-kit install dev"
    ;;
  *)
    echo ""
    echo "Add this to your shell profile so the command is available everywhere:"
    echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo ""
    echo "Then restart the terminal and run:"
    echo "  kasa-starter-kit install dev"
    ;;
esac
