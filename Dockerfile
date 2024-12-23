FROM node:14.21.3-alpine as base

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm i -g serve

RUN npm run build


FROM base as final

COPY --from=base /usr/src/app/build ./build 

EXPOSE 3012

CMD [ "serve","-s","./build","-l","3012" ]