FROM node:lts-stretch-slim

# ENV MYSQL_USER=root
# ENV MYSQL_PASSWORD=root
# ENV MYSQL_HOST=localhost
# ENV MYSQL_PORT=3306
# ENV MYSQL_DBNAME=ardiman_tando

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install --only=production

EXPOSE 3030

# CMD [ "npm", "migrate" ]

CMD [ "npm", "start" ]
