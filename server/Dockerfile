FROM node:21
USER node
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci
RUN npm run build
CMD [ "node", "dist/main.js" ]
