FROM node:14.21.3-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3012

RUN npm run build