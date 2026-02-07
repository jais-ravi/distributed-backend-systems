# Distributed Backend System

This is a distributed backend system built with Node.js, TypeScript, and pnpm workspaces. It consists of multiple microservices routed via a Traefik API Gateway.

## Architecture

- **API Gateway**: Traefik (Routes requests to services)
- **Auth Service**: Handles authentication (Running on port 3000 internally)
- **User Service**: Handles user management (Running on port 3002 internally)
- **Shared Packages**:
  - `@shared/logger`
  - `@shared/middlewares`
  - `@shared/types`

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v8+)

## Getting Started (Docker)

The easiest way to run the system is using Docker Compose.

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd distributed-backend-system/backend
    ```

2.  **Start the services**:
    ```bash
    docker compose up --build -d
    ```
    This command will:
    - Build the Docker images for `auth-service` and `user-service`.
    - Start Traefik as the reverse proxy on port `80`.
    - Start the microservices.

3.  **Verify the setup**:

    - **Traefik Dashboard**: [http://localhost:8080](http://localhost:8080)
    - **Auth Service Health**:
      ```bash
      curl http://localhost/auth/health
      ```
    - **User Service Health**:
      ```bash
      curl http://localhost/users/health
      ```

## Development

To run the services locally without Docker:

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run services in development mode**:
    ```bash
    # Run Auth Service
    pnpm --filter auth-service dev

    # Run User Service
    pnpm --filter user-service dev
    ```

## API Endpoints

All API requests should be routed through the API Gateway at `http://localhost`.

| Service      | Route Prefix | Internal Port | Description |
| :---         | :---         | :---          | :---        |
| Auth Service | `/auth`      | 3000          | Authentication logic |
| User Service | `/users`     | 3002          | User profile management |
