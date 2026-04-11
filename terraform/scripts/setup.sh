#!/bin/bash
# ==============================================================
# HopLucCorp — Dokku Setup Script
# Creates apps, database, redis, env vars, domains, SSL
# Run by Terraform via remote-exec
# ==============================================================
set -euo pipefail

echo "========================================"
echo " HopLucCorp — Dokku Setup"
echo "========================================"

# ---- 1. Check plugins (already installed on this server) ----
echo "[1/7] Checking Dokku plugins..."

PLUGINS=$(dokku plugin:list 2>/dev/null || true)
if echo "$PLUGINS" | grep -q "postgres"; then
  echo "  dokku-postgres already installed"
else
  echo "  Installing dokku-postgres..."
  dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
fi

if echo "$PLUGINS" | grep -q "redis"; then
  echo "  dokku-redis already installed"
else
  echo "  Installing dokku-redis..."
  dokku plugin:install https://github.com/dokku/dokku-redis.git redis
fi

if echo "$PLUGINS" | grep -q "letsencrypt"; then
  echo "  dokku-letsencrypt already installed"
else
  echo "  Installing dokku-letsencrypt..."
  dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
fi

# ---- 2. Create apps ----
echo "[2/7] Creating apps..."

if ! dokku apps:exists "$API_APP" 2>/dev/null; then
  dokku apps:create "$API_APP"
  echo "  Created $API_APP"
else
  echo "  $API_APP already exists"
fi

if ! dokku apps:exists "$WEB_APP" 2>/dev/null; then
  dokku apps:create "$WEB_APP"
  echo "  Created $WEB_APP"
else
  echo "  $WEB_APP already exists"
fi

# ---- 3. Create and link database ----
echo "[3/7] Setting up PostgreSQL..."

if ! dokku postgres:exists "$DB_NAME" 2>/dev/null; then
  dokku postgres:create "$DB_NAME"
  echo "  Created database $DB_NAME"
else
  echo "  Database $DB_NAME already exists"
fi

if ! dokku postgres:linked "$DB_NAME" "$API_APP" 2>/dev/null; then
  dokku postgres:link "$DB_NAME" "$API_APP"
  echo "  Linked $DB_NAME → $API_APP"
else
  echo "  $DB_NAME already linked to $API_APP"
fi

# ---- 4. Create and link Redis ----
echo "[4/7] Setting up Redis..."

if ! dokku redis:exists "$REDIS_NAME" 2>/dev/null; then
  dokku redis:create "$REDIS_NAME"
  echo "  Created redis $REDIS_NAME"
else
  echo "  Redis $REDIS_NAME already exists"
fi

if ! dokku redis:linked "$REDIS_NAME" "$API_APP" 2>/dev/null; then
  dokku redis:link "$REDIS_NAME" "$API_APP"
  echo "  Linked $REDIS_NAME → $API_APP"
else
  echo "  $REDIS_NAME already linked to $API_APP"
fi

# ---- 5. Set environment variables ----
echo "[5/7] Setting environment variables..."

# Backend (Django)
dokku config:set --no-restart "$API_APP" \
  DJANGO_SETTINGS_MODULE=config.settings.production \
  DJANGO_SECRET_KEY="$DJANGO_SECRET_KEY" \
  DJANGO_ADMIN_URL="$DJANGO_ADMIN_URL" \
  DJANGO_ALLOWED_HOSTS="$API_DOMAIN" \
  DJANGO_SECURE_SSL_REDIRECT=True \
  CORS_ALLOWED_ORIGINS="https://$WEB_DOMAIN" \
  CLOUDINARY_CLOUD_NAME="$CLOUDINARY_CLOUD_NAME" \
  CLOUDINARY_API_KEY="$CLOUDINARY_API_KEY" \
  CLOUDINARY_API_SECRET="$CLOUDINARY_API_SECRET" \
  SENTRY_DSN="$SENTRY_DSN" \
  DOKKU_DOCKERFILE_PATH=compose/production/django/Dockerfile

echo "  Backend env vars set"

# Frontend (Next.js)
dokku config:set --no-restart "$WEB_APP" \
  NEXT_PUBLIC_API_URL="https://$API_DOMAIN" \
  NODE_ENV=production

echo "  Frontend env vars set"

# ---- 6. Set domains ----
echo "[6/7] Setting domains..."

dokku domains:clear "$API_APP"
dokku domains:add "$API_APP" "$API_DOMAIN"
echo "  $API_APP → $API_DOMAIN"

dokku domains:clear "$WEB_APP"
dokku domains:add "$WEB_APP" "$WEB_DOMAIN"
echo "  $WEB_APP → $WEB_DOMAIN"

# ---- 7. Configure ports ----
echo "[7/7] Setting ports..."

dokku ports:set "$API_APP" http:80:5000
dokku ports:set "$WEB_APP" http:80:3000

# ---- Done ----
echo ""
echo "========================================"
echo " Setup Complete!"
echo "========================================"
echo ""
echo " Backend:  http://$API_DOMAIN"
echo " Frontend: http://$WEB_DOMAIN"
echo " Admin:    http://$API_DOMAIN/$DJANGO_ADMIN_URL"
echo ""
echo " Next steps:"
echo "   1. Add DNS A records pointing to $(hostname -I | awk '{print $1}')"
echo "   2. Push code via GitHub Actions or git push"
echo "   3. After first deploy, enable SSL:"
echo "      dokku letsencrypt:set $API_APP email your@email.com"
echo "      dokku letsencrypt:enable $API_APP"
echo "      dokku letsencrypt:set $WEB_APP email your@email.com"
echo "      dokku letsencrypt:enable $WEB_APP"
echo ""
