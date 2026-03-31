#!/bin/bash
# =============================================================
# FilmmAiker Studio — Deploy script
# Usage: bash deploy.sh
# Requires: ssh, sshpass (brew install sshpass / apt install sshpass)
# =============================================================

SERVER="46.202.171.141"
USER="root"
PASS='M7p&aQ9-hL3(vN@x'
REMOTE_DIR="/var/www/filmmaiker"
DOMAIN="$SERVER"   # Change to your domain when DNS is ready

set -e

echo ""
echo "▶  Building production bundle..."
npm run build

echo ""
echo "▶  Connecting to $SERVER..."

# Bootstrap server on first run
sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no "$USER@$SERVER" bash << 'REMOTE'
  set -e
  echo "  → Updating packages..."
  apt-get update -qq

  # Install Node 20 if missing
  if ! command -v node &>/dev/null; then
    echo "  → Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  fi

  # Install Nginx if missing
  if ! command -v nginx &>/dev/null; then
    echo "  → Installing Nginx..."
    apt-get install -y nginx
    systemctl enable nginx
    systemctl start nginx
  fi

  # Create web root
  mkdir -p /var/www/filmmaiker
REMOTE

echo ""
echo "▶  Uploading dist/ to server..."
sshpass -p "$PASS" rsync -az --delete \
  --exclude='.git' \
  dist/ "$USER@$SERVER:$REMOTE_DIR/"

echo ""
echo "▶  Configuring Nginx..."
sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no "$USER@$SERVER" bash << REMOTE
  cat > /etc/nginx/sites-available/filmmaiker << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/filmmaiker;
    index index.html;

    # SPA — all routes to index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
NGINX

  # Enable site
  ln -sf /etc/nginx/sites-available/filmmaiker /etc/nginx/sites-enabled/filmmaiker
  rm -f /etc/nginx/sites-enabled/default

  nginx -t && systemctl reload nginx
  echo "  → Nginx configured ✓"
REMOTE

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ Deploy complete!"
echo "  🌐 http://$SERVER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Next steps:"
echo "  1. Point your domain DNS A record → $SERVER"
echo "  2. Install SSL:  apt install certbot python3-certbot-nginx"
echo "                   certbot --nginx -d yourdomain.com"
echo ""
