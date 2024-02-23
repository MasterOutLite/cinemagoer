## Getting Started

First, run the development server:

## Warning
Not forget what you need to feel env file before all action
Exists two env file: .development.env and .production.env

## DataBase Postgres
For server you can use Docker compose file that is inside dir cinemagoer-api 

or use own installed DataBase
```bash
cd .\cinemagoer-api\
docker compose up
```

## Before run server you can seed base data


```bash
# seed data
#  NODE_ENV - .development.env | example .env file
cd .\cinemagoer-api\
yarn
npx cross-env NODE_ENV=development npx nestjs-command seed:all
```

## Start server
Not forget what you need to feel env file
```bash
cd .\cinemagoer-api\
yarn
yarn dev
```
or
```bash
cd .\cinemagoer-api\
npm i
npm run dev
```

## Start client

```bash
cd .\cinemagoer-ui\
yarn 
yarn dev
```
or
```bash
cd .\cinemagoer-ui\
npm i
npm run dev
```
## Start App
Start server

```bash
cd .\cinemagoer-api\
yarn dev
```

Start client
```bash
cd .\cinemagoer-ui\
yarn dev
```
