# Pull base image from stock node image.
FROM node:8

#install PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
RUN npm install pm2 -g

#RUN useradd --user-group --create-home --shell /bin/false appuser
#ENV HOME=/home/appuser

#COPY package.json $HOME/app/
#RUN chown -R appuser:appuser $HOME/*

#USER appuser

##install npm for API
#WORKDIR $HOME/app
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

#Start APP with PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
CMD ["pm2-dev", "pm2.docker.process.yml"]
