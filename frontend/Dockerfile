FROM node:22-alpine AS build

WORKDIR /temp/frontend
COPY . .
RUN rm -rf node_modules
RUN npm ci
RUN npm run build

FROM nginx:1.26.2-alpine

COPY --from=build /temp/frontend/dist/browser /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
