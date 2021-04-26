FROM node:13.12.0-alpine as build

WORKDIR /front
ENV PATH /front/node_modules/.bin:$PATH
COPY /front/package.json ./
COPY /front/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY /front/. ./
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /front/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]