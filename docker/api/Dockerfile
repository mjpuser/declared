FROM node:10-alpine

ADD ./app /app

WORKDIR /app
RUN npm ci
EXPOSE 8000

CMD ["npm", "start", "--", "--port", "8000"]
