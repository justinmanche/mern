if [ ! $(ssh mern 'test -f /etc/ssl/cert.pem') ]; then
  echo 'Adding /etc/ssl/cert.pem'
  scp $GITHUB_WORKSPACE/frontend/config/certs/cert.pem mern:/etc/ssl/cert.pem
else
  echo '/etc/ssl/cert.pem already exists'
fi

if [ ! $(ssh mern 'test -f /etc/ssl/cloudflare.crt') ]; then
  echo 'Adding /etc/ssl/cloudflare.crt'
  scp $GITHUB_WORKSPACE/frontend/config/certs/cloudflare.crt mern:/etc/ssl/cloudflare.crt
else
  echo '/etc/ssl/cloudflare.crt already exists'
fi

if [ ! $(ssh mern 'test -f /etc/ssl/key.pem') ]; then
  echo 'Adding /etc/ssl/key.pem'
  echo $KEY > $GITHUB_WORKSPACE/frontend/config/certs/key.pem

  scp $GITHUB_WORKSPACE/frontend/config/certs/key.pem mern:/etc/ssl/key.pem
else
  echo '/etc/ssl/key.pem already exists'
fi
