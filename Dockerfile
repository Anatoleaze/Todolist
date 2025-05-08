# Étape 1 : Build de l'app
FROM node:18-alpine AS build-stage

WORKDIR /app

# Dépendances build nécessaires pour node-gyp (dont Python 3, make, g++)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Nginx pour servir les fichiers
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
