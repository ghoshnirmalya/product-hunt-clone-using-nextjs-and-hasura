FROM mhart/alpine-node:11.1.0

RUN mkdir /web-app

WORKDIR /web-app

RUN apk update && apk upgrade && apk add --no-cache bash git

COPY . /web-app/

RUN yarn global add nodemon ts-node typescript

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
