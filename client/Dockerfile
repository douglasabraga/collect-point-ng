FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install --save ng2-smart-table --force
COPY . .
RUN npm run build


FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/client /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf