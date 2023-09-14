FROM node:19-alpine
ARG api_base_url
WORKDIR /app
COPY package*.json .
RUN npm i --silent
COPY . .
RUN echo "VITE_API_BASE_URL=${api_base_url}" > .env
EXPOSE 5173
RUN node_modules/esbuild/install.js
CMD ["npm", "run", "dev"]