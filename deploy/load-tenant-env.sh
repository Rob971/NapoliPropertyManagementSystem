#!/usr/bin/env bash
# Load customer tenant env vars for static export builds.
# Usage: source deploy/load-tenant-env.sh   (or: eval "$(deploy/load-tenant-env.sh --export)")
set -euo pipefail

TENANT_ID="${TENANT_ID:-napoli}"
ENV_FILE="deploy/tenants/${TENANT_ID}.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Tenant config not found: ${ENV_FILE}" >&2
  exit 1
fi

if [[ "${1:-}" == "--export" ]]; then
  grep -E '^NEXT_PUBLIC_' "$ENV_FILE" | sed 's/^/export /'
  exit 0
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

echo "Loaded tenant: ${TENANT_ID} (${ENV_FILE})"
