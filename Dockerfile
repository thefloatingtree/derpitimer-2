FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

CMD ["npm", "run", "serve"]