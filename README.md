# Declared

Setup

```bash
# ~/.bashrc

# This allows you to use docker as a dev environment.  
# It sets the user as your host user so that permissions
# dont get messed up when creating files.
export UID=${UID}
export GID=${GID}
```

Startup

```bash
docker compose up -d

# brings you in a docker container for your dev env
yarn dev

# install hasura-cli deps
yarn install

# apply metadata to your local hasura instance
# (hasura uses a metadata db)
hasura metadata apply

# apply migrations to your local hasura instance
hasura migration apply --database-name declared
```
