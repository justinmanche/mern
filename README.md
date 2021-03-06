# WIP MERN Template

This app is intended to serve as a starting point for quickly prototyping ideas.

It comes with a MongoDB database, NodeJS backend using Express, and two react frontends built on Material-UI (with redux for state management).

You can use one or both of the React frontends, one is intended as an admin UI (based off GCP), the other is intended as a typical user portal (based off AirBnB).

I have taken care to use the latest versions of each package that has been used in this project, and the latest features available in those packages.  In particular, the frontend apps exclusively use React functional components with hooks, and redux took kit utilities.

## Deployment

A simple GitHub action is included that relies on you having set an SSH_KEY, SSH_USER, and SSH_HOST as GitHub secrets for the machine that you would like to deploy to.

You should also ensure that the repo is cloned to `/home/${USER}/<repo>` on the remote machine, and that docker-compose is installed.

You can install the latest version of docker-compose on a remote machine with the following commands:

```
sudo curl -L "https://github.com/docker/compose/releases/download/v1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```
