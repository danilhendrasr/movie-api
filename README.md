# Movie API
A simple but well-organized movie API built using Nest.js and MySQL. Requirements can be accessed at https://bitbucket.org/campaignid/sd-backend-screening-test/src/master/.

Originally this project was my technical assignment project for Campaign.com's backend engineer internship application,
but then I expanded it a little bit by adding more extensive unit tests, CI pipeline, migration mechanism,
e2e tests, as well as fixes some container-related issues.

## Developing
### Prerequisites
- Node.js
- PNPM
- MySQL

### Steps
1. Clone the repo.
2. Run the following to install dependencies.
    ```bash
    pnpm install
    ```
3. Copy the `.env.example` file and rename it to `.env`, adjust the content according
   to your desired configurations.
4. Run the dev server in watch mode.
    ```bash
    pnpm run start:dev
    ```
5. Run the following if you want to seed the database with dummy data.
    ```bash
    pnpm run seed
    ```
6. The API will be accessible at http://localhost:3000, documentation is available at http://localhost:3000/docs.

### Health Check
This API features a simple health check to make it easier to see the status of the system including its dependencies such as the database. Go to http://localhost:3000/health to see this feature.

## Testing
There are 2 kinds of tests provided for this API, which are unit tests and end-to-end tests.
To run unit tests:
```bash
pnpm test
```

As for the end-to-end tests, I recommend running it using docker compose to save
the hassle of setting things up manually. To run end-to-end tests:
```bash
docker compose -f docker/docker-compose.test.yml up --build --abort-on-container-exit
```

## Deploying
For seamless deployment, run the api using docker compose:
```bash
docker compose -f docker/docker-compose.yml up -d --build
```

## Routes
There are 2 main routes, which are:
| Route     | Usage                                                                                              |
|-----------|----------------------------------------------------------------------------------------------------|
| `/movies` | Manage movies such as getting movies, getting one movie, listing all casts, create new movie, etc. |
| `/casts`  | Manage movies such as getting movies, getting one movie, listing all casts, create new movie, etc. |

The main routes's URL are prefixed with the API version, so in order to access it we acces the following URLs respectively: `v1/movies` and `v1/casts`.
