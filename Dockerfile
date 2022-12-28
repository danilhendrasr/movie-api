FROM node:16

RUN npm i -g pnpm

WORKDIR /home/movie-api

COPY package*.json ./

RUN pnpm i

COPY . .

ENV NODE_ENV=production

RUN pnpm build && chmod -R +x ./scripts

EXPOSE 3000

CMD ["./scripts/start.sh"]
