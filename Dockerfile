FROM --platform=linux/amd64 node:18-alpine3.19
RUN apk add --no-cache python3 py3-pip
RUN apk add --no-cache g++ make

ARG NODE_ENV=development
ARG APP_ENV
ENV NODE_ENV=$NODE_ENV
ENV APP_ENV=$APP_ENV

WORKDIR /app

COPY ["./package*.json", "/app/"]

RUN npm i --quiet

COPY . ./

EXPOSE 3103
EXPOSE 3170

CMD npm run dev
