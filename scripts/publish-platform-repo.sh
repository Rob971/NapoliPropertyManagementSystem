#!/usr/bin/env bash
# Publish the reusable PMS platform to a new GitHub repository.
#
# Prerequisites:
#   - GitHub CLI: https://cli.github.com/
#   - Personal access token with repo + admin:org (for org repos) scope:
#       export GH_TOKEN=ghp_...
#
# Usage:
#   GH_TOKEN=ghp_xxx ./scripts/publish-platform-repo.sh
#   GH_TOKEN=ghp_xxx GITHUB_ORG=Rob971 GITHUB_REPO_NAME=PropertyManagementSystem ./scripts/publish-platform-repo.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ORG="${GITHUB_ORG:-Rob971}"
REPO="${GITHUB_REPO_NAME:-PropertyManagementSystem}"
DESCRIPTION="${GITHUB_REPO_DESCRIPTION:-Multi-tenant Italian municipal property management system — reusable PMS platform with parameterized DevOps}"
TEMPLATE="${MARK_AS_TEMPLATE:-true}"

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "Error: GH_TOKEN is required (PAT with repo create + push scope)." >&2
  echo "Example: GH_TOKEN=ghp_xxx $0" >&2
  exit 1
fi

export GH_TOKEN
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "==> Preparing platform export in ${WORK}"

rsync -a \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude 'out' \
  --exclude 'docs/napoli-pms-customer-discovery-en-it.html' \
  --exclude 'docs/napoli-pms-customer-discovery-en-it.pdf' \
  --exclude 'deploy/tenants/napoli.env' \
  "$ROOT/" "$WORK/"

# Platform repo uses generic README and default tenant
cp "$ROOT/platform/README.md" "$WORK/README.md"
cp "$ROOT/platform/RELEASES.md" "$WORK/RELEASES.md"
cp "$ROOT/platform/package.json" "$WORK/package.json"

# Default tenant for platform repo CI
mkdir -p "$WORK/deploy/tenants"
cp "$ROOT/deploy/tenants/default.env" "$WORK/deploy/tenants/default.env"
cp "$ROOT/deploy/tenants/_template.env" "$WORK/deploy/tenants/_template.env"

# Point CI at default tenant (not napoli)
sed -i 's/TENANT_ID: "napoli"/TENANT_ID: "default"/' "$WORK/.gitlab-ci.yml"
sed -i "s/vars.TENANT_ID || 'napoli'/vars.TENANT_ID || 'default'/" "$WORK/.github/workflows/deploy-pages.yml"

cd "$WORK"
git init -b main
git add -A
git commit -m "Initial release: Italian municipal PMS platform

Extracted from NapoliPropertyManagementSystem abstraction layer (v1.4.0).
Includes multi-tenant branding, parameterized GitHub/GitLab DevOps, and i18n (IT + en-GB)."

FULL="${ORG}/${REPO}"
if gh repo view "$FULL" &>/dev/null; then
  echo "==> Repository ${FULL} already exists — pushing to main"
else
  echo "==> Creating ${FULL}"
  gh repo create "$FULL" \
    --public \
    --description "$DESCRIPTION" \
    --source=. \
    --remote=origin \
    --push
  if [[ "$TEMPLATE" == "true" ]]; then
    gh repo edit "$FULL" --template
    echo "==> Marked ${FULL} as a GitHub template repository"
  fi
  echo "==> Done: https://github.com/${FULL}"
  exit 0
fi

git remote add origin "https://github.com/${FULL}.git" 2>/dev/null || git remote set-url origin "https://github.com/${FULL}.git"
git push -u origin main --force

if [[ "$TEMPLATE" == "true" ]]; then
  gh repo edit "$FULL" --template
fi

echo "==> Published: https://github.com/${FULL}"
