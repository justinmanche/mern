FROM node:15-alpine as builder

ARG NODE_ENV
ARG API_HOST
ARG API_PORT

ENV NODE_ENV=${NODE_ENV}
ENV API_HOST=${API_HOST}
ENV API_PORT=${API_PORT}

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx

COPY --from=builder /app/admin/dist /usr/share/nginx/html/admin
COPY --from=builder /app/customer/dist /usr/share/nginx/html/customer
COPY --from=builder /app/entrypoint.sh /entrypoint.sh
COPY --from=builder /app/nginx.conf.template /nginx.conf.template

EXPOSE 8080

RUN ls -l

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
