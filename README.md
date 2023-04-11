# wallet-test-task

This monorepo contains wallet-api and wallet-processor services. See package.json of each service for build and start commands.

## Local setup

### Docker
Use docker-compose to spin up local instances of Mongo, Redis and Mongo Express. You can access Mongo Express through browser on http://localhost:8091.

### Environment Variables
Place your DB conn details and Api Key in .env files of each service. See [.env.example](/wallet-api/.env.example) for details.

### Postman
Postman collection for wallet-api is located [here](/wallet-api/postman)