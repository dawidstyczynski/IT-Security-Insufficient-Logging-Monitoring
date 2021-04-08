FROM node:14

WORKDIR /usr/backend/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
