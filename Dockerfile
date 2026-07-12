# ---------- Etapa 1: compilación TypeScript ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install --no-audit --no-fund

COPY src ./src
RUN npm run build

# ---------- Etapa 2: servidor estático (nginx) ----------
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html/dist
COPY index.html /usr/share/nginx/html/index.html
COPY styles /usr/share/nginx/html/styles
COPY assets /usr/share/nginx/html/assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:80/ || exit 1
