FROM node:22.15.1-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY src/package.json src/package-lock.json* ./
RUN npm install

COPY src/ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
