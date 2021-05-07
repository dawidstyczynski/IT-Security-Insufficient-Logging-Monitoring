FROM node:14

WORKDIR /usr/backend/

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 5500
