FROM node:10-alpine

RUN mkdir /app

ADD ./app/package.json /app/package.json
ADD ./app/package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm ci
ADD ./app /app
EXPOSE 8000

CMD ["npm", "start", "--", "--port", "8000"]
