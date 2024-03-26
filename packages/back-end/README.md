<div align="center" style="margin-bottom: 20px;">
  <div>
    <h1>SHORT LINKS</h1>
  </div>

  <div align="center">
    <img alt="technology" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
  </div>
</div>

## :memo: About project

This project provides a URL shortening service, allowing you to transform long links into shorter, more manageable versions that redirect to the original URL. Additionally, it includes a metrics feature, offering detailed analysis on how frequently each shortened link is accessed. Developed with Node.js and utilizing the Fastify microframework, this project combines efficiency and performance for an enhanced user experience.

## :rocket: Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Swagger](https://swagger.io/)
- [Zod](https://zod.dev/)

## :cyclone: Run this project

```bash
# Clone this project
$ git clone https://github.com/jefferson1104/short-links-api.git

# Project directory
$ cd short-links

# Install dependencies
$ npm install

# Run docker container
$ docker compose up -d

# Create postgres database
$ npm run setup

# Run project on localhost:3333
$ npm run dev

# Documentation
http://localhost:3333/api/documentation
```
