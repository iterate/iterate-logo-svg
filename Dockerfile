FROM node:10

ENV NODE_ENV production

# Install dumb-init
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init

RUN mkdir -p /app/
WORKDIR /app/

COPY package.json .
COPY yarn.lock .
RUN yarn install --pure-lockfile

EXPOSE 3010

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["node", "main.js"]