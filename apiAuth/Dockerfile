FROM node:20-alpine

WORKDIR /home/node/app/apiAuth

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
