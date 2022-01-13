FROM node:15-alpine

RUN apk update
RUN apk add nginx

ARG DIR=/app

WORKDIR $DIR

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2", "start", "index.js"]
