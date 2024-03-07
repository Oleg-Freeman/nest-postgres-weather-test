FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT
ENV POSTGRES_HOST=postgres

CMD npm start
