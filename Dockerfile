FROM node:20.15.1-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV PORT=3000

EXPOSE $PORT

CMD ["node", "index.js"]