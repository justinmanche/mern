#!/usr/bin/env sh
set -eu

envsubst '${CUSTOMER_DOMAIN} ${ADMIN_DOMAIN} ${API_HOST} ${API_PORT}' < /config/nginx.conf.template > /etc/nginx/conf.d/nginx.conf

exec "$@"
