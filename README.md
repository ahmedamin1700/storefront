# Storefront Backend Project

## Getting Started

This repo contains a backend API for an online store. To get started, clone this repo and run `yarn` in your terminal at the project root.

You can check the database schema and API endpoints in the [REQUIREMENT.md](REQUIREMENTS.md)

## Technologies

The application use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- bcrypt from npm for hashing passwords
- body-parser from npm for parsing incomong requests bodies

## Steps

### Create And Connect To Database

- After running the docker container for postgres
  `docker-compose up -d`.

We shall create the dev and test databases.

- connect to the default postgres database as the server's root user `psql -U postgres`.
- In psql run the following to create a user
  - `CREATE USER storefront WITH PASSWORD 'storefront';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE storefront_dev;`
  - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c storefront_dev`
    - `GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storefront;`
  - Grant for test database
    - `\c storefront_test`
    - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;`

### Migration

You can run the command below the create migrations.
`yarn migrate:up`

## Environment Variables

You can set your environment variables as below.

```
HOST=localhost
PORT=3000
NODE_ENV=dev

# Database configurations.
PG_HOST=localhost
PG_USER=storefront
PG_PASSWORD=storefront
PG_DB=storefront_dev
PG_TEST_DB=storefront_test

# Hasing
PEPPER=thisisourapppepper
SALT=10

# JWT secret
JWT_SECRET=thisisjwtsecret
TOKEN_TEST=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlcjEiLCJwYXNzd29yZCI6IiQyYiQxMCQ3Z0pQMTRtZUlpdWVCdzMwblBCME4ub2hHRnJjL0MvbVJtUWNxLjQ1dkpyQzVlMlluOFBsbSIsImZpcnN0bmFtZSI6InRlc3QiLCJsYXN0bmFtZSI6InVzZXIiLCJpYXQiOjE2NDM5MzgxMTN9.XuVTOi4-wmDYptOxvZJWWzUwlcoO9Ue_lYz4gdiBq3Y
```

## Automations

All tasks are available through `yarn` scripts.

### Linter/prettier

Code styling check and automatic fix is handled by ESLint. You can execute the command below:

```bash
yarn lint
yarn prettier
```

### Typescript transpiling

The backend code is delivered through the `./src` folder, and the transformed output is placed under `./dist`.
You can execute the command below:

```bash
yarn build
```

### Seeding database

You can seed development database with users, products and orders to be able to use the API in dev.

```bash
yarn seed
```

### Executing Jest test

The test suite validates basic functionality of the images handler helper. You can execute the command below:

```bash
yarn test
```

### Executing the server

There are two modes of execution:

1. Single execution (build and serve the `dist/server.js`)
2. Execution with watcher mode and restart enabled

The commands to achieve the builds described above are, respectively:

```bash
yarn start
yarn watch
```
