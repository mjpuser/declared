# Declared

Setup

```bash
# ~/.bashrc

# This allows you to use docker as a dev environment.  It sets the user as your host user so that permissions dont get messed up when creating files.
export UID=${UID}
export GID=${GID}
```

Startup

```bash
# brings you in a docker container for your dev env
yarn dev
yarn install
yarn hasura metadata apply
```
