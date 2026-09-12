# install.ps1 - Windows shim for the cross-platform installer.
#
# The real implementation is install.mjs (one code path for Windows, macOS and
# Linux). This file only exists so older links and docs keep working.
#
#   powershell -ExecutionPolicy Bypass -File .\install.ps1
#   powershell -ExecutionPolicy Bypass -File .\install.ps1 -Hues blue,orange,purple,rose
#   powershell -ExecutionPolicy Bypass -File .\install.ps1 -DryRun
#
# Equivalent on any platform:
#   node install.mjs [--hues ...] [--dry-run] [--pnpm]
#
# NOTE: keep this file ASCII-only (Windows PowerShell 5.1 reads BOM-less .ps1 as ANSI).

$ErrorActionPreference = "Stop"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "node was not found in PATH. Install Node.js first."
}

$forward = @()
foreach ($a in $args) {
  if ($a -eq "-DryRun") { $forward += "--dry-run" }
  elseif ($a -eq "-Hues") { $forward += "--hues" }
  elseif ($a -eq "-Pnpm") { $forward += "--pnpm" }
  elseif ($a -eq "-ProfileDir") { $forward += "--profile" }
  else { $forward += $a }
}

& node (Join-Path $PSScriptRoot "install.mjs") @forward
exit $LASTEXITCODE
