FROM node:20-alpine

WORKDIR /home/node/app/apiCrudUser

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]
