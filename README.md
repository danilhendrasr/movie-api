# Movie API
A simple but well-organized movie API built using Nest.js and MySQL. Requirements can be accessed at https://bitbucket.org/campaignid/sd-backend-screening-test/src/master/.

## Developing
### Prerequisites
- Node.js
- PNPM
- MySQL

### Steps
1. Clone the repo
2. Run the following to install dependencies
    ```bash
    pnpm install
    ```
3. Run the dev server in watch mode
    ```bash
    pnpm run start:dev
    ```
4. Run the following if you want to seed the database with dummy data
    ```bash
    pnpm run seed
    ```
5. The API will be accessible at http://localhost:3000, documentation is available at http://localhost:3000/docs.

## Deploying
Run the following to get the docker compose up and running
```bash
docker compose -d up
```

The API will be accessible at http://localhost:3000, documentation is available at http://localhost:3000/docs.

## Features Overview
There are basically 2 main routes and 1 additional route:
### Main Routes
There are 2 main routes and 1 additional route, which are:
| Route     | Usage                                                                                              |
|-----------|----------------------------------------------------------------------------------------------------|
| `/movies` | Manage movies such as getting movies, getting one movie, listing all casts, create new movie, etc. |
| `/casts`  | Manage movies such as getting movies, getting one movie, listing all casts, create new movie, etc. |

The main routes's URL are prefixed with the API version, so in order to access it we acces the following URLs respectively: `v1/movies` and `v1/casts`.

### Testing
This code base feature unit testings to ensure bugs can be caught faster in the development loop. Run the following if you want to check out the tests
```bash
pnpm test
```

### Health Check
This API features a simple health check to make it easier to see the status of the system including its dependencies such as the database. Go to http://localhost:3000/health to see this feature.