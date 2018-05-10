FROM node:carbon

USER root

RUN apt-get update && \
	apt-get install -y software-properties-common

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install nodemon -g

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server/server.js"]
