#!/usr/bin/env sh
set -eu

envsubst '${CUSTOMER_DOMAIN} ${ADMIN_DOMAIN}' < /nginx.conf.template > /etc/nginx/conf.d/nginx.conf

exec "$@"
