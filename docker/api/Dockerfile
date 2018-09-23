FROM node:10-alpine

ADD ./app /app

WORKDIR /app
RUN npm i
ADD ./todo.js /app/api/models/todo.js
