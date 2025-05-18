FROM node:22.15.1-alpine

WORKDIR /app

# 必要なパッケージのインストール
RUN apk add --no-cache git

# 依存関係のインストール
COPY src/package.json src/package-lock.json* ./
RUN npm install

# アプリケーションのコピー
COPY src/ ./

EXPOSE 3000

# 開発サーバーの起動
CMD ["npm", "run", "dev"]
