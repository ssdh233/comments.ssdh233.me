FROM node:16-alpine3.12

RUN apk update && apk upgrade

RUN apk add sqlite

WORKDIR /usr/src/app

COPY . .

RUN npm install
CMD [ "node", "./index.js"]
