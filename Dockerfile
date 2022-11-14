FROM node:16

RUN npm i -g pnpm

WORKDIR /home/movie-api

COPY package*.json ./

RUN pnpm i

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
