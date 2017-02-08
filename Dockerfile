FROM node:5.12.0-slim

ENV FAKE_JSON_SERVER_WORKDIR=/usr/src/fake-json-server

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p $FAKE_JSON_SERVER_WORKDIR && cp -a /tmp/node_modules $FAKE_JSON_SERVER_WORKDIR

WORKDIR $FAKE_JSON_SERVER_WORKDIR
COPY . $FAKE_JSON_SERVER_WORKDIR

EXPOSE 3000
CMD ["npm", "start"]
