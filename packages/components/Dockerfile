# Step 1. Build the javascript bundle

FROM node:hydrogen-alpine@sha256:c0ec76209d4ac70d67aa611a85196999a8d71e01945c8657f48142369bb27e96
WORKDIR /app

RUN apk update && apk upgrade

COPY . .

# Remove packages we don't need to speed up yarn install
RUN rm -rf /app/packages/*

# Copy packages
COPY packages/components /app/packages/components

RUN apk update && apk upgrade && apk add --no-cache make python3 g++
RUN yarn install

# Build components
WORKDIR /app/packages/components
RUN yarn build-storybook


# Step 2. Build the actual image

FROM nginx@sha256:6db391d1c0cfb30588ba0bf72ea999404f2764febf0f1f196acd5867ac7efa7e

RUN apt-get update && apt-get upgrade -y

ARG HOST
ARG COUNTRY_CONFIG_URL
ENV HOST=$HOST
ENV COUNTRY_CONFIG_URL=$COUNTRY_CONFIG_URL

COPY --from=0 /app/packages/components/build/ /usr/share/nginx/html/

COPY infrastructure/nginx-deploy-config.sh /
COPY infrastructure/nginx-default.conf /etc/nginx/conf.d/default.conf

RUN chmod +x /nginx-deploy-config.sh
CMD ["bash", "-c", "'./nginx-deploy-config.sh'"]
