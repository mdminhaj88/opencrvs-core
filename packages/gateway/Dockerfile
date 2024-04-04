FROM node:hydrogen-alpine@sha256:c0ec76209d4ac70d67aa611a85196999a8d71e01945c8657f48142369bb27e96

WORKDIR /app

RUN apk update && apk upgrade

COPY . .

RUN rm -rf /app/packages/*

COPY packages/gateway /app/packages/gateway
COPY packages/commons /app/packages/commons

RUN yarn install

WORKDIR /app/packages/commons
RUN yarn build

WORKDIR /app/packages/gateway
RUN yarn build

# FIXME: to be replaced later with whole build running as node
RUN chown -R node:node /app

USER node

CMD yarn start:prod
