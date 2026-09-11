# install.ps1 - dsh-ui-skin-wave installer (idempotent, ASCII-only).
#
# Steps:
#   [1/3] choose the 4 palettes (6 candidates) and build the bundle
#   [2/3] remove leftovers from the previous package name (dsh-client-ui-skin)
#         -- uninstall before install, per PLUGIN-DEV-CHECKLIST section 3
#   [3/3] register through the official channel:
#           npx -y @deepseek-ai/dsh plugin --profile web add <spec>
#         the package self-mounts via its own cordis.patch.yml (dsh.bundle.patch),
#         so NO hand-written profile insert is needed.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\install.ps1
#   powershell -ExecutionPolicy Bypass -File .\install.ps1 -Hues blue,orange,purple,rose
#   powershell -ExecutionPolicy Bypass -File .\install.ps1 -Hues 1,2,5,6
#
# Without -Hues an interactive picker is shown (Enter keeps the current set).
# Optional:
#   -ProfileDir <path>  default: $env:USERPROFILE\.dsh\profiles\web
#   -SourceDir  <path>  default: the script's own directory
#   -BuildDir   <path>  default: D:\DSH\dsh-blue-home
#   -BackupDir  <path>  default: D:\DSH\backups
#   -Hues       <list>  four keys or numbers, e.g. blue,orange,purple,rose / 1,2,5,6
#
# NOTE: keep this file ASCII-only. Windows PowerShell 5.1 decodes BOM-less .ps1
# files as ANSI, which corrupts non-ASCII text and breaks parsing.

param(
  [string]$ProfileDir = (Join-Path $env:USERPROFILE ".dsh\profiles\web"),
  [string]$SourceDir  = $PSScriptRoot,
  [string]$BuildDir   = $PSScriptRoot,   # the build chain now lives inside the package
  [string]$BackupDir  = "D:\DSH\backups",
  [string]$Hues      = ""
)

$ErrorActionPreference = "Stop"
$PACKAGE = "dsh-ui-skin-wave"
$LEGACY  = "@deepseek-ai/dsh-client-ui-skin"
$LEGACY_ID = "dsh-client-ui-skin"
$NL = [char]10

if (-not (Test-Path (Join-Path $SourceDir "package.json"))) { throw "package.json not found at $SourceDir" }
if (-not (Test-Path (Join-Path $SourceDir "lib\client.js"))) { throw "lib\client.js not found at $SourceDir" }
if (-not (Test-Path (Join-Path $SourceDir "cordis.patch.yml"))) { throw "cordis.patch.yml not found at $SourceDir" }

# ---------- [1/3] palettes + build ----------
$selectScript = Join-Path $BuildDir "build\select-hues.mjs"
$buildSkin = Join-Path $BuildDir "build\build-skin.mjs"
$buildPlugin = Join-Path $BuildDir "build\build-plugin.mjs"
if (Test-Path $selectScript) {
  Write-Host "[1/3] Choosing the 4 palettes (6 candidates) and building ..."
  if ($Hues -ne "") { node $selectScript $Hues } else { node $selectScript }
  if ($LASTEXITCODE -ne 0) { throw "palette selection failed (exit $LASTEXITCODE)" }
  node $buildSkin
  if ($LASTEXITCODE -ne 0) { throw "build-skin failed (exit $LASTEXITCODE)" }
  node $buildPlugin
  if ($LASTEXITCODE -ne 0) { throw "build-plugin failed (exit $LASTEXITCODE)" }
} else {
  Write-Host "[1/3] Build scripts not found under $BuildDir\build, using the existing lib\client.js."
}

# ---------- [2/3] legacy cleanup (must run before mounting, see the checklist) ----------
# The project was renamed from @deepseek-ai/dsh-client-ui-skin. Leaving the old
# dependency or the old hand-written profile insert behind can brick the boot.
Write-Host "[2/3] Removing leftovers from the previous name ..."
$pkgFile = Join-Path $ProfileDir "package.json"
$json = Get-Content $pkgFile -Raw | ConvertFrom-Json
if ($json.dependencies.$LEGACY) {
  Write-Host "      removing legacy dependency $LEGACY"
  Push-Location $ProfileDir
  try { pnpm remove $LEGACY | Out-Host } finally { Pop-Location }
} else {
  Write-Host "      no legacy dependency"
}
$patchFile = Join-Path $ProfileDir "cordis.patch.yml"
if (Test-Path $patchFile) {
  $content = Get-Content $patchFile -Raw
  if ($content -match [regex]::Escape($LEGACY_ID)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Copy-Item $patchFile (Join-Path $BackupDir ("cordis.patch.yml.bak-legacy-" + (Get-Date -Format "yyyyMMdd-HHmmss"))) -Force
    $content = [regex]::Replace($content, "(\r?\n){2}- insert:\r?\n\s+- id: " + $LEGACY_ID + "\r?\n\s+name: '" + [regex]::Escape($LEGACY) + "'", "")
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($patchFile, $content, $utf8NoBom)
    Write-Host "      removed the legacy hand-written insert"
  } else {
    Write-Host "      no legacy insert"
  }
}

# ---------- [3/3] register through the official channel ----------
Write-Host "[3/3] Registering through 'dsh plugin add' (self-mounting bundle) ..."
# link: keeps the profile reading the source directory live (no re-snapshot
# needed after a rebuild). If the CLI rejects the spec, fall back to file:
# (snapshot copy) and note that every later change needs a re-run.
$spec = "link:" + ($SourceDir -replace "\\", "/")
$specFallback = "file:" + ($SourceDir -replace "\\", "/")
Push-Location $ProfileDir
try {
  npx -y "@deepseek-ai/dsh" plugin --profile web add $spec
  if ($LASTEXITCODE -ne 0) {
    Write-Host "      link: spec was rejected, retrying with file: ..."
    npx -y "@deepseek-ai/dsh" plugin --profile web add $specFallback
    if ($LASTEXITCODE -ne 0) {
      throw "dsh plugin add failed. Run it manually: npx -y @deepseek-ai/dsh plugin --profile web add $spec"
    }
    Write-Host "      registered with file: - re-run this script after every code change (snapshot copy)."
  } else {
    Write-Host "      registered with link: - later rebuilds are picked up live."
  }
} finally { Pop-Location }

Write-Host ""
Write-Host "Done. Restart 'dsh web' once for the new loader entry to take effect."
Write-Host "Preflight (must pass before restarting):"
Write-Host "    node <dsh-skill-manager>\tools\preflight.mjs --package $SourceDir --profile web"
Write-Host "Verify: Settings shows a new 'Skin' section right below 'Skills'."
