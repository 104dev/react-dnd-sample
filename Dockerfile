FROM node:16.15

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

#RUN npm cache clean -force 
RUN npm install
