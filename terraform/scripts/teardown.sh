#!/bin/bash
# ==============================================================
# HopLucCorp — Dokku Teardown Script
# Removes apps, database, redis (keeps plugins for other apps)
# Run by Terraform on `terraform destroy`
# ==============================================================
set -euo pipefail

echo "========================================"
echo " HopLucCorp — Dokku Teardown"
echo "========================================"
echo ""
echo " WARNING: Destroying all HopLucCorp resources"
echo ""

# ---- 1. Unlink services ----
echo "[1/4] Unlinking services..."

if dokku postgres:linked "$DB_NAME" "$API_APP" 2>/dev/null; then
  dokku postgres:unlink "$DB_NAME" "$API_APP"
  echo "  Unlinked $DB_NAME from $API_APP"
fi

if dokku redis:linked "$REDIS_NAME" "$API_APP" 2>/dev/null; then
  dokku redis:unlink "$REDIS_NAME" "$API_APP"
  echo "  Unlinked $REDIS_NAME from $API_APP"
fi

# ---- 2. Destroy apps ----
echo "[2/4] Destroying apps..."

if dokku apps:exists "$API_APP" 2>/dev/null; then
  dokku apps:destroy "$API_APP" --force
  echo "  Destroyed $API_APP"
fi

if dokku apps:exists "$WEB_APP" 2>/dev/null; then
  dokku apps:destroy "$WEB_APP" --force
  echo "  Destroyed $WEB_APP"
fi

# ---- 3. Destroy database ----
echo "[3/4] Destroying database..."

if dokku postgres:exists "$DB_NAME" 2>/dev/null; then
  dokku postgres:destroy "$DB_NAME" --force
  echo "  Destroyed database $DB_NAME"
fi

# ---- 4. Destroy Redis ----
echo "[4/4] Destroying Redis..."

if dokku redis:exists "$REDIS_NAME" 2>/dev/null; then
  dokku redis:destroy "$REDIS_NAME" --force
  echo "  Destroyed redis $REDIS_NAME"
fi

echo ""
echo "========================================"
echo " Teardown Complete!"
echo "========================================"
echo ""
echo " All HopLucCorp resources removed."
echo " Dokku plugins (postgres, redis, letsencrypt) are kept"
echo " for other apps on this server."
echo ""
