FROM node:20-alpine

WORKDIR /home/node/app/apiEmail

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
