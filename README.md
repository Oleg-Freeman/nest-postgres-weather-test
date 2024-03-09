## Description

Weather API is a simple REST API that provides weather information for a given city. It uses the OpenWeatherMap API to get the weather information.

## Installation

```bash
$ npm install
```

## Configuration

See the `.env.example` file for the environment variables that need to be set. The following environment variables need to be set in the `.env` file:

## API Documentation

The API documentation can be found at the `/api/v1/docs` endpoint. The documentation is generated using Swagger.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration

```bash
# generate migration
$ npm run migration:generate

# run migration
$ npm run migration:run

# revert migration
$ npm run migration:revert
```
