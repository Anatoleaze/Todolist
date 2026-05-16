# Étape 1 : Build de l'app
FROM node:20-alpine AS build-stage

WORKDIR /app

# Dépendances nécessaires pour certains packages natifs
RUN apk add --no-cache python3 make g++

# Copie des fichiers package
COPY package*.json ./

# Installation propre des dépendances
RUN npm ci

# Copie du projet
COPY . .

# Build Vite
RUN npm run build

# Étape 2 : Nginx pour servir l'app
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]