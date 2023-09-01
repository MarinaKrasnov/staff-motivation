FROM node:18.13.0-alpine as mybuild
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
RUN npm run build

