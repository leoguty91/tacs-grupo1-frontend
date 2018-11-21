FROM node:11.1.0-slim
ARG DIR_APP=/usr/src/eventapp/
WORKDIR ${DIR_APP}
COPY package.json .
RUN npm install
COPY . .
RUN npm run builddocker
RUN mkdir back
CMD ["npm", "run", "start"]
