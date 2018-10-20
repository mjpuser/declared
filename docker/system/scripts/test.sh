#!/usr/bin/env bash

docker-compose up -d

API_PORT=$(docker-compose -p system port user 3000 | cut -d':' -f2) \
    npm run jest -- --detectOpenHandles

docker-compose down
