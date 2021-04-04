FROM node:14

WORKDIR /usr/backend/

COPY dist ./
COPY package.json ./

WORKDIR /usr/backend/

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
