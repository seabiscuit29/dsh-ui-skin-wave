#!/bin/sh
# dsh-ui-skin-wave installer for macOS / Linux - thin shim over install.mjs.
#   ./install.sh                 interactive 6-choose-4
#   ./install.sh --hues 1,2,5,6  pick by number
#   ./install.sh --dry-run       print the plan, touch nothing
exec node "$(dirname "$0")/install.mjs" "$@"
