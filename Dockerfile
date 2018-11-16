FROM node

RUN apt-get update && apt-get install -y vim

WORKDIR /utterzone-server

COPY ./package.json .
COPY ./server/package.json ./server/
COPY ./common/package.json ./common/

RUN npm i -g yarn 
RUN yarn install --production

COPY ./server/dist ./server/dist
COPY ./common/dist ./common/dist
COPY ./server/.env	./server/.env

WORKDIR ./server

ENV NODE_ENV production

EXPOSE 3010 

CMD ["node", "dist/index.js"]
