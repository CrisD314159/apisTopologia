FROM node:20-alpine

WORKDIR /home/node/app/apiInvoices

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
