FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 5000
EXPOSE 8080
CMD ["npm", "run", "serve"]