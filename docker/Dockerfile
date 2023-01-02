FROM node:16

RUN npm i -g pnpm

WORKDIR /home/movie-api

COPY package*.json ./

RUN pnpm i

COPY . .

ENV NODE_ENV=production

RUN pnpm build && chmod -R +x ./scripts

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 3000

CMD /wait && ./scripts/start.sh
