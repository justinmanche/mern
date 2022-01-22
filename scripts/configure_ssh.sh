mkdir -p ~/.ssh
echo "${SSH_KEY}" > ~/.ssh/docker
chmod 600 ~/.ssh/docker
printf "Host mern\n  Hostname ${SSH_HOST}\n  User ${SSH_USER}\n  IdentityFile ~/.ssh/docker\n" > ~/.ssh/config
ssh-keyscan ${SSH_HOST} > ~/.ssh/known_hosts
