FROM node:18.16-buster-slim

WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install nano && apt-get install wget -y

WORKDIR /app

COPY . .

RUN npm install
RUN npm install pm2 -g

RUN npm run build

#PRODUCCIÓN
# CMD ["npm", "run","start"]
# CMD ["npm", "run", "start-express"]
# CMD ["pm2-runtime", "ecosystem.config.js"]

#DESARROLLO
CMD ["npm", "run", "dev"]
