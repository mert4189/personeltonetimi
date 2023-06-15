FROM node:alpine




WORKDIR /app
COPY package*.json ./


COPY . /app
COPY ./public ./public
COPY ./ copyımages



RUN npm install

RUN npm run build

RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

   

EXPOSE 3000



CMD [ "serve", "-s", "build" ]