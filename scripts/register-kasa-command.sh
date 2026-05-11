#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
STARTER_TARGET="$ROOT_DIR/kasa-starter-kit"
EXISTING_KASA="$(command -v kasa 2>/dev/null || true)"

if [ ! -x "$STARTER_TARGET" ]; then
  chmod +x "$STARTER_TARGET"
fi

register_starter() {
  bin_dir="$1"
  mkdir -p "$bin_dir"
  ln -sf "$STARTER_TARGET" "$bin_dir/kasa-starter-kit"
  echo "Registered kasa-starter-kit command at $bin_dir/kasa-starter-kit"
}

if [ -w /usr/local/bin ]; then
  ln -sf "$STARTER_TARGET" /usr/local/bin/kasa-starter-kit
  echo "Registered kasa-starter-kit command at /usr/local/bin/kasa-starter-kit"
  echo "Run: hash -r"
  echo "Then verify: kasa-starter-kit edition"
  echo "You can now run: kasa-starter-kit install dev"
  if [ -n "$EXISTING_KASA" ]; then
    echo ""
    echo "Existing kasa command is untouched:"
    echo "  $EXISTING_KASA"
  fi
  exit 0
fi

LOCAL_BIN="$HOME/.local/bin"
register_starter "$LOCAL_BIN"

case ":$PATH:" in
  *":$LOCAL_BIN:"*)
    echo "Run: hash -r"
    echo "Then verify: kasa-starter-kit edition"
    echo "You can now run: kasa-starter-kit install dev"
    ;;
  *)
    echo ""
    echo "Add this to your shell profile so kasa-starter-kit is available everywhere:"
    echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo ""
    echo "Then restart the terminal or run:"
    echo "  hash -r"
    echo "  kasa-starter-kit edition"
    ;;
esac

if [ -n "$EXISTING_KASA" ]; then
  echo ""
  echo "Existing kasa command is untouched:"
  echo "  $EXISTING_KASA"
fi
