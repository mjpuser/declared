FROM node:10-alpine

ADD ./app /app

WORKDIR /app
RUN npm i
ADD ./todo.js /app/model-schema.js
EXPOSE 8000

CMD ["npm", "start", "--", "--port", "8000"]
