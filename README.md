# Instructions

Starter template for 😻 [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

[Postman Documentation](https://identity.getpostman.com/handover/multifactor?user=15905030&handover_token=8729f4ba-7962-4459-ab12-18c1757f2ea7)

[Postman Nest-backend REST-API](https://speeding-capsule-68866.postman.co/workspace/Team-Workspace~d19af575-99c6-4b6d-8ef9-186657f492b9/collection/15905030-c9c5840a-e11c-415c-962e-38be4a4ca93a?action=share&creator=15905030&active-environment=15905030-e9a53d1d-dfb3-41bd-beca-8bf6615894b1)

[Postman Nest-backend Websocket](https://speeding-capsule-68866.postman.co/workspace/Team-Workspace~d19af575-99c6-4b6d-8ef9-186657f492b9/collection/6512c25b97fc8e4d2f995eca?action=share&creator=15905030&active-environment=15905030-e9a53d1d-dfb3-41bd-beca-8bf6615894b1)

### 1. Install Dependencies

Install [Nestjs CLI](https://docs.nestjs.com/cli/usages) to start and [generate CRUD resources](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute)

Install the dependencies for the Nest application:

```bash
# npm
npm install
# yarn
yarn install
# pnpm
pnpm install
```

### 2. PostgreSQL with Docker

Setup a development PostgreSQL with Docker. Copy [.env.example](./.env.example) and rename to `.env` - `cp .env.example .env` - which sets the required environments for PostgreSQL such as `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`. Update the variables as you wish and select a strong password.

Start the PostgreSQL database

```bash
make postgres
```

### 3. Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the PostgreSQL database. Prisma reads the `DATABASE_URL` from the root [.env](./.env) file.

Use Prisma Migrate in your [development environment](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#evolving-the-schema-in-development) to

1. Creates `migration.sql` file
2. Updates Database Schema
3. Generates Prisma Client

```bash
make prisma-int
```

### 4. Prisma: Prisma Studio

```bash
npx prisma studio
# or npm/yarn/pnpm
make prisma-studio
```

### 5. Seed the database data with this script

Execute the script with this command:

```bash
#  npm/yarn/pnpm
pnpm run seed
```

### 6. Start NestJS Server

Run Nest Server in Development mode:

```bash
#  npm/yarn/pnpm
pnpm run start

# watch mode
pnpm run start:dev
```

Run Nest Server in Production mode:

```bash
pnpm run start:prod
```

Prisma Studio for the NestJS Server is available here: http://localhost:5555/

**[⬆ back to top](#overview)**

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

## Docker

Nest server is a Node.js application and it is easily [dockerized](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

See the [Dockerfile](./Dockerfile) on how to build a Docker image of your Nest server.

Now to build a Docker image of your own Nest server simply run:

```bash
# give your docker image a name
docker build -t <your username>/nest-prisma-server .
# for example
docker build -t nest-prisma-server .
```

After Docker build your docker image you are ready to start up a docker container running the nest server:

```bash
docker run -d -t -p 3000:3000 --env-file .env nest-prisma-server
```

Now open up [localhost:3000](http://localhost:3000) to verify that your nest server is running.

When you run your NestJS application in a Docker container update your [.env](.env) file

```diff
- DB_HOST=localhost
# replace with name of the database container
+ DB_HOST=postgres

# Prisma database connection
+ DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
```

If `DATABASE_URL` is missing in the root `.env` file, which is loaded into the Docker container, the NestJS application will exit with the following error:

```bash
(node:19) UnhandledPromiseRejectionWarning: Error: error: Environment variable not found: DATABASE_URL.
  -->  schema.prisma:3
   |
 2 |   provider = "postgresql"
 3 |   url      = env("DATABASE_URL")
```

### Docker Compose

You can also setup a the database and Nest application with the docker-compose

```bash
# building new NestJS docker image
docker-compose build
# or
pnpm run docker:build

# start docker-compose
docker-compose up -d
# or
pnpm run docker
```

## Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
npx prisma generate
# or in watch mode
npx prisma generate --watch
# or
pnpm run prisma:generate
pnpm run prisma:generate:watch
```

**[⬆ back to top](#overview)**
