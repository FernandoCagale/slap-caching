# slap-caching

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```sh
$ nvm use 8.6.0
```

```sh
$ npm install
```

`Starting Redis server`

```sh
$ docker run --name redis -d -p 6379:6379 smebberson/alpine-redis
```

`Starting PostgreSQL server`

```sh
$ docker run --name postgres -d -p 5434:5432 --env 'DB_USER=postgres' --env 'DB_PASS=postgres' --env 'DB_NAME=slap' sameersbn/postgresql:9.6-2
```

```sh
$ npm start
```

API Endpoints:
- GET `/people` (query) `/people?gender=Male` `/people?gender=Female`
- GET `/people/{id}`
- PUT `/people/{id}`
- POST `/people`
- DELETE `/people/{id}`
- POST `/add` fixtures