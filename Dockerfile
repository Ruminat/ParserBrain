FROM node:18
WORKDIR /usr/src/parser-brain-app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn build

COPY . .

EXPOSE 8080

CMD ["node", "dist/index.js"]
