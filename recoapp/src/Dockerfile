FROM node:8

RUN apt-get update && apt-get install -y \
  sudo \
  curl

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm audit fix

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]