FROM node:11.1.0-slim
ARG DIR_APP=/usr/src/eventapp/
COPY . ${DIR_APP}
WORKDIR ${DIR_APP}
EXPOSE 4200
CMD ["npm", "run", "start"]
