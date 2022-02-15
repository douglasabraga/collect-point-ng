FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9190
RUN npm start