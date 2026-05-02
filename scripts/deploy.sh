#!/usr/bin/env bash
# =============================================================================
# Maharashtra Fuel Partner — VPS deploy script
# =============================================================================
# Self-contained deploy for an Ubuntu 22.04+/Debian 12+ Hostinger KVM VPS.
#
#   Run as root (or sudo):
#     curl -fsSL https://raw.githubusercontent.com/dhansoia/maharashtra/claude/start-building-V46Dn/scripts/deploy.sh \
#       | sudo MODE=subpath DOMAIN=dhansoia.com BASE_PATH=/maharashtra REPO_URL=git@github.com:dhansoia/maharashtra.git BRANCH=claude/start-building-V46Dn bash
#
#   Or: clone first, edit the env block at the top, then ./scripts/deploy.sh
#
#   Modes:
#     MODE=subpath   →  serves at https://DOMAIN/BASE_PATH (e.g. dhansoia.com/maharashtra)
#     MODE=subdomain →  serves at https://DOMAIN          (e.g. maharashtra.dhansoia.com)
#
# Idempotent: safe to re-run. Skips steps that are already done.
# =============================================================================
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# 1. CONFIG  — override via env vars before invoking
# ─────────────────────────────────────────────────────────────────────────────
MODE="${MODE:-subpath}"                                  # subpath | subdomain
DOMAIN="${DOMAIN:-dhansoia.com}"                         # for subpath, the existing site
BASE_PATH="${BASE_PATH:-/maharashtra}"                   # only used in subpath mode
SUBDOMAIN_NAME="${SUBDOMAIN_NAME:-maharashtra.dhansoia.com}" # only used in subdomain mode
APP_USER="${APP_USER:-mfp}"
APP_DIR="${APP_DIR:-/var/www/maharashtra-fuel}"
NODE_VERSION="${NODE_VERSION:-20}"
APP_PORT="${APP_PORT:-3001}"                             # internal port; nginx proxies to it
PM2_NAME="${PM2_NAME:-maharashtra-fuel}"
REPO_URL="${REPO_URL:-https://github.com/dhansoia/maharashtra.git}"
BRANCH="${BRANCH:-claude/start-building-V46Dn}"
PG_DB="${PG_DB:-maharashtra_fuel}"
PG_USER="${PG_USER:-mfp}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@${DOMAIN}}"            # used by certbot
SKIP_SSL="${SKIP_SSL:-false}"

# ─────────────────────────────────────────────────────────────────────────────
# 2. HELPERS
# ─────────────────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; BOLD='\033[1m'; NC='\033[0m'
say()  { echo -e "${GREEN}[deploy]${NC} $*"; }
warn() { echo -e "${YELLOW}[deploy] WARN${NC} $*"; }
die()  { echo -e "${RED}[deploy] ERROR${NC} $*" >&2; exit 1; }
need_root() { [[ $EUID -eq 0 ]] || die "Must run as root (sudo)."; }
have() { command -v "$1" >/dev/null 2>&1; }

confirm() {
  echo -e "${BOLD}$*${NC}"
  read -rp "Continue? [y/N] " ans
  [[ "$ans" =~ ^[yY]$ ]] || die "Aborted by user."
}

# ─────────────────────────────────────────────────────────────────────────────
# 3. PRE-FLIGHT
# ─────────────────────────────────────────────────────────────────────────────
need_root
[[ "$MODE" == "subpath" || "$MODE" == "subdomain" ]] || die "MODE must be 'subpath' or 'subdomain'."

PUBLIC_HOST="$DOMAIN"
PUBLIC_BASE_PATH=""
if [[ "$MODE" == "subdomain" ]]; then
  PUBLIC_HOST="$SUBDOMAIN_NAME"
else
  PUBLIC_BASE_PATH="$BASE_PATH"
fi
PUBLIC_URL="https://${PUBLIC_HOST}${PUBLIC_BASE_PATH}"

cat <<EOF

================================================================
${BOLD}Maharashtra Fuel Partner — Deploy Plan${NC}
================================================================
  Mode               : $MODE
  Public URL         : $PUBLIC_URL
  App directory      : $APP_DIR
  App user           : $APP_USER
  Internal port      : $APP_PORT
  PM2 name           : $PM2_NAME
  Database           : $PG_DB (user: $PG_USER)
  Repo               : $REPO_URL @ $BRANCH
  Node version       : $NODE_VERSION
  SSL via certbot    : $([ "$SKIP_SSL" = "true" ] && echo "SKIPPED" || echo "yes (admin: $ADMIN_EMAIL)")
================================================================

EOF

confirm "About to install/update system packages and configure nginx + PM2 + Postgres."

# ─────────────────────────────────────────────────────────────────────────────
# 4. SYSTEM PACKAGES
# ─────────────────────────────────────────────────────────────────────────────
say "Updating apt and installing base packages…"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates gnupg lsb-release git build-essential nginx postgresql postgresql-contrib ufw

# ── Node.js ──────────────────────────────────────────────────────────────────
if ! have node || [[ "$(node -v 2>/dev/null | cut -c2- | cut -d. -f1)" -lt "$NODE_VERSION" ]]; then
  say "Installing Node.js $NODE_VERSION…"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash -
  apt-get install -y nodejs
else
  say "Node $(node -v) already installed."
fi

# ── PM2 ──────────────────────────────────────────────────────────────────────
if ! have pm2; then
  say "Installing PM2…"
  npm install -g pm2
fi

# ── Certbot ──────────────────────────────────────────────────────────────────
if [[ "$SKIP_SSL" != "true" ]] && ! have certbot; then
  say "Installing certbot…"
  apt-get install -y certbot python3-certbot-nginx
fi

# ─────────────────────────────────────────────────────────────────────────────
# 5. APP USER & DIRECTORY
# ─────────────────────────────────────────────────────────────────────────────
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  say "Creating user $APP_USER…"
  useradd -m -s /bin/bash "$APP_USER"
fi
mkdir -p "$APP_DIR"
chown -R "$APP_USER":"$APP_USER" "$APP_DIR"

# ─────────────────────────────────────────────────────────────────────────────
# 6. POSTGRES DATABASE
# ─────────────────────────────────────────────────────────────────────────────
say "Configuring PostgreSQL…"
systemctl enable --now postgresql

if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$PG_USER'" | grep -q 1; then
  PG_PASSWORD="$(openssl rand -hex 24)"
  sudo -u postgres psql -c "CREATE USER \"$PG_USER\" WITH PASSWORD '$PG_PASSWORD';"
  sudo -u postgres psql -c "CREATE DATABASE \"$PG_DB\" OWNER \"$PG_USER\";"
  echo "$PG_PASSWORD" > "$APP_DIR/.pg_password"
  chmod 600 "$APP_DIR/.pg_password"
  chown "$APP_USER":"$APP_USER" "$APP_DIR/.pg_password"
  say "Created Postgres user '$PG_USER' (password saved to $APP_DIR/.pg_password)."
else
  PG_PASSWORD="$(cat "$APP_DIR/.pg_password" 2>/dev/null || echo "")"
  if [[ -z "$PG_PASSWORD" ]]; then
    warn "Postgres user '$PG_USER' exists but no .pg_password file found — rotating password."
    PG_PASSWORD="$(openssl rand -hex 24)"
    sudo -u postgres psql -c "ALTER USER \"$PG_USER\" WITH PASSWORD '$PG_PASSWORD';"
    echo "$PG_PASSWORD" > "$APP_DIR/.pg_password"
    chmod 600 "$APP_DIR/.pg_password"
    chown "$APP_USER":"$APP_USER" "$APP_DIR/.pg_password"
  else
    say "Postgres user '$PG_USER' already configured."
  fi
fi

DATABASE_URI="postgresql://$PG_USER:$PG_PASSWORD@127.0.0.1:5432/$PG_DB"

# ─────────────────────────────────────────────────────────────────────────────
# 7. CLONE OR PULL REPO
# ─────────────────────────────────────────────────────────────────────────────
if [[ -d "$APP_DIR/.git" ]]; then
  say "Updating existing repo at $APP_DIR…"
  sudo -u "$APP_USER" git -C "$APP_DIR" fetch origin "$BRANCH"
  sudo -u "$APP_USER" git -C "$APP_DIR" checkout "$BRANCH"
  sudo -u "$APP_USER" git -C "$APP_DIR" reset --hard "origin/$BRANCH"
else
  say "Cloning $REPO_URL @ $BRANCH into $APP_DIR…"
  sudo -u "$APP_USER" git clone --branch "$BRANCH" --single-branch "$REPO_URL" "$APP_DIR"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 8. ENV FILE
# ─────────────────────────────────────────────────────────────────────────────
ENV_FILE="$APP_DIR/.env"
if [[ ! -f "$ENV_FILE" ]]; then
  say "Writing $ENV_FILE…"
  PAYLOAD_SECRET="$(openssl rand -hex 32)"
  cat > "$ENV_FILE" <<EOF
# Generated by deploy.sh on $(date -Iseconds)
DATABASE_URI=$DATABASE_URI
PAYLOAD_SECRET=$PAYLOAD_SECRET
NEXT_PUBLIC_SITE_URL=$PUBLIC_URL
$( [[ -n "$PUBLIC_BASE_PATH" ]] && echo "BASE_PATH=$PUBLIC_BASE_PATH" )

# Filled in later — visit the corresponding dashboards to obtain
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@$DOMAIN
ADMIN_NOTIFY_EMAIL=$ADMIN_EMAIL
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_GA_ID=
EOF
  chmod 600 "$ENV_FILE"
  chown "$APP_USER":"$APP_USER" "$ENV_FILE"
  warn "Edit $ENV_FILE to add Razorpay/Resend keys, then redeploy with: sudo -u $APP_USER pm2 restart $PM2_NAME --update-env"
else
  say "$ENV_FILE already exists; not overwriting."
fi

# ─────────────────────────────────────────────────────────────────────────────
# 9. INSTALL & BUILD
# ─────────────────────────────────────────────────────────────────────────────
say "Installing npm dependencies (this can take a few minutes)…"
sudo -u "$APP_USER" --preserve-env=PATH bash -c "cd '$APP_DIR' && npm ci --no-audit --no-fund || npm install --no-audit --no-fund"

say "Building Next.js app…"
sudo -u "$APP_USER" --preserve-env=PATH bash -c "cd '$APP_DIR' && set -a && . .env && set +a && npm run build"

# ─────────────────────────────────────────────────────────────────────────────
# 10. PM2 PROCESS
# ─────────────────────────────────────────────────────────────────────────────
say "Configuring PM2 process '$PM2_NAME' on port $APP_PORT…"
ECOSYSTEM_FILE="$APP_DIR/ecosystem.config.cjs"
cat > "$ECOSYSTEM_FILE" <<EOF
module.exports = {
  apps: [
    {
      name: '$PM2_NAME',
      cwd: '$APP_DIR',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p $APP_PORT',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '768M',
      autorestart: true,
      time: true,
    },
  ],
}
EOF
chown "$APP_USER":"$APP_USER" "$ECOSYSTEM_FILE"

if sudo -u "$APP_USER" pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  sudo -u "$APP_USER" pm2 reload "$ECOSYSTEM_FILE" --update-env
else
  sudo -u "$APP_USER" pm2 start "$ECOSYSTEM_FILE"
fi
sudo -u "$APP_USER" pm2 save

# Enable PM2 on boot for the app user
PM2_STARTUP_CMD="$(pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER" 2>/dev/null | grep -E '^sudo' || true)"
if [[ -n "$PM2_STARTUP_CMD" ]]; then
  say "Enabling PM2 on boot…"
  eval "$PM2_STARTUP_CMD"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 11. NGINX
# ─────────────────────────────────────────────────────────────────────────────
NGINX_AVAIL="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
mkdir -p "$NGINX_AVAIL" "$NGINX_ENABLED"

if [[ "$MODE" == "subdomain" ]]; then
  CONF_NAME="maharashtra-fuel.conf"
  say "Writing nginx server block for $PUBLIC_HOST → :$APP_PORT"
  cat > "$NGINX_AVAIL/$CONF_NAME" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $PUBLIC_HOST;

    client_max_body_size 50M;
    proxy_http_version 1.1;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
}
EOF
  ln -sf "$NGINX_AVAIL/$CONF_NAME" "$NGINX_ENABLED/$CONF_NAME"
else
  # SUBPATH: drop a snippet that gets included into the existing $DOMAIN server.
  CONF_NAME="maharashtra-fuel-subpath.conf"
  SNIPPET_DIR="/etc/nginx/snippets"
  mkdir -p "$SNIPPET_DIR"
  say "Writing nginx subpath snippet for $PUBLIC_BASE_PATH → :$APP_PORT"
  cat > "$SNIPPET_DIR/$CONF_NAME" <<EOF
# Maharashtra Fuel Partner — mounted at $PUBLIC_BASE_PATH
location $PUBLIC_BASE_PATH {
    proxy_pass http://127.0.0.1:$APP_PORT;
    proxy_http_version 1.1;
    client_max_body_size 50M;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header X-Forwarded-Host \$host;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_cache_bypass \$http_upgrade;
    proxy_read_timeout 60s;
}
EOF
  cat <<EOF

${BOLD}MANUAL STEP — subpath mode${NC}

The snippet has been written to:
  $SNIPPET_DIR/$CONF_NAME

You must include it in the existing $DOMAIN server block. Edit the
nginx config that already serves $DOMAIN (typically
$NGINX_AVAIL/$DOMAIN or $NGINX_AVAIL/default) and add this line
INSIDE the 'server { ... }' block that handles $DOMAIN:

  include $SNIPPET_DIR/$CONF_NAME;

Then continue with: nginx -t && systemctl reload nginx
EOF
fi

say "Testing nginx config…"
nginx -t
systemctl reload nginx

# ─────────────────────────────────────────────────────────────────────────────
# 12. FIREWALL
# ─────────────────────────────────────────────────────────────────────────────
if have ufw; then
  ufw allow 'Nginx Full' || true
  ufw allow OpenSSH || true
fi

# ─────────────────────────────────────────────────────────────────────────────
# 13. SSL (subdomain mode only — subpath inherits cert from existing site)
# ─────────────────────────────────────────────────────────────────────────────
if [[ "$SKIP_SSL" != "true" && "$MODE" == "subdomain" ]]; then
  say "Requesting Let's Encrypt SSL for $PUBLIC_HOST…"
  certbot --nginx -d "$PUBLIC_HOST" --non-interactive --agree-tos -m "$ADMIN_EMAIL" --redirect || \
    warn "certbot failed — re-run manually: certbot --nginx -d $PUBLIC_HOST"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 14. SMOKE TEST
# ─────────────────────────────────────────────────────────────────────────────
say "Smoke-testing local app on 127.0.0.1:$APP_PORT…"
sleep 3
LOCAL_PROBE_PATH="${PUBLIC_BASE_PATH:-/}"
HTTP_CODE="$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:$APP_PORT$LOCAL_PROBE_PATH" || echo "000")"
if [[ "$HTTP_CODE" =~ ^(200|301|302|307|308)$ ]]; then
  say "App responding locally with HTTP $HTTP_CODE."
else
  warn "Local probe returned HTTP $HTTP_CODE. Check logs: sudo -u $APP_USER pm2 logs $PM2_NAME"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 15. SUMMARY
# ─────────────────────────────────────────────────────────────────────────────
cat <<EOF

================================================================
${GREEN}${BOLD}Deployment finished.${NC}
================================================================
  Public URL          : $PUBLIC_URL
  Internal port       : 127.0.0.1:$APP_PORT
  PM2 process         : $PM2_NAME (sudo -u $APP_USER pm2 status)
  App logs            : sudo -u $APP_USER pm2 logs $PM2_NAME
  Postgres            : $DATABASE_URI
  Env file            : $ENV_FILE   ← edit & 'pm2 restart $PM2_NAME --update-env'
  Nginx config        : $([ "$MODE" = subdomain ] && echo "$NGINX_AVAIL/$CONF_NAME" || echo "$SNIPPET_DIR/$CONF_NAME (manual include needed)")

  Next steps:
    1. Visit $PUBLIC_URL to confirm the marketing site loads.
    2. Visit $PUBLIC_URL/admin and create the first admin user.
    3. Edit $ENV_FILE → add Razorpay & Resend keys, then:
         sudo -u $APP_USER pm2 restart $PM2_NAME --update-env
    4. Point your DNS A record (subdomain mode) to this server's IP.

  Re-run this script anytime to update the app — it will git-pull
  the latest of branch '$BRANCH', npm install, build, and reload PM2.
================================================================

EOF
