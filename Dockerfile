FROM node:lts-stretch-slim

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install --only=production

CMD [ "npm", "migrate" ]

CMD [ "npm", "start" ]
