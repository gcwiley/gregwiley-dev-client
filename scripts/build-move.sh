I #!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_DIR="$SCRIPT_DIR/.."
SERVER_SRC_DIR="$SCRIPT_DIR/../../gregwiley-dev-server/src"

echo "Building Angular app..."
cd "$CLIENT_DIR"
npm run build

echo "Removing old dist from server..."
rm -rf "$SERVER_SRC_DIR/dist"

echo "Moving dist to server src..."
mv "$CLIENT_DIR/dist" "$SERVER_SRC_DIR/dist"

echo "Done! Dist moved to $SERVER_SRC_DIR/dist"