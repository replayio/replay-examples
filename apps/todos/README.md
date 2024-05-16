# Things To-Do app

This is a simple "Things" To-Do app clone that uses:

- React
- jotai
- Tailwind
- Prisma
- TypeScript

You can run it locally by simply cloning this repo and typing:

```bash
npm install
npm run dev
```

into your terminal.


## Local development

You can run this app locally.

### Requirements

- Docker
- Postgres

To check if you have these installed, open terminal and run these commands:

```bash
psql --version
docker --version
```

If any of these commands throw an error, follow installation instructions on [Postgres](https://www.postgresql.org/download/) and [Docker](https://www.docker.com/) homepages.

### Installation

1. Create a `docker-compose.yml` file with following contents:

```yml
version: "3"
services:
  db:
    image: postgres:latest
    container_name: prisma_postgres
    environment:
      POSTGRES_USER: <YOUR_NAME>
      POSTGRES_PASSWORD: <YOUR_PASS>
      POSTGRES_DB: <DB_NAME>
    ports:
      - "5432:5432"
```

2. Create a `.env` file with following content

```bash
POSTGRES_PRISMA_URL="postgresql://<YOUR_NAME>:<YOUR_PASS>@localhost:5432/<DB_NAME>?schema=public"
POSTGRES_URL_NON_POOLING="postgresql://<YOUR_NAME>:<YOUR_PASS>@localhost:5432/<DB_NAME>?schema=public"
```

3. Rename `<YOUR_NAME>`, `<YOUR_PASS>`, `<DB_NAME>` in both `docker-compose.yml` file and `.env`. Since we are in local development, these can be set to anything you want. You can also change the default `5432` port.
4. Run `docker-compose up -d`
5. Run `npx prisma migrate dev --name init` to initialize database
6. Run `npm run dev`

If anything goes wrong, don’t hesitate to open an issue, or reach out to us on [Replay.io Discord](https://discord.gg/replayio)
