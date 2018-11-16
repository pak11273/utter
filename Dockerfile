FROM node

RUN apt-get update && apt-get install -y vim

WORKDIR /utterzone-server

COPY ./package.json .
COPY ./backend/package.json ./backend/
COPY ./common/package.json ./common/

RUN npm i -g yarn 
RUN yarn install --production

COPY ./backend/dist ./backend/dist
COPY ./common/dist ./common/dist
COPY ./backend/.env	./backend/.env

WORKDIR ./backend

ENV NODE_ENV production

EXPOSE 3010 

CMD ["node", "dist/index.js"]
