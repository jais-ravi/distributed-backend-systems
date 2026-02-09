# Distributed Backend System

This is a distributed backend system built with Node.js, TypeScript, and pnpm workspaces. It consists of multiple microservices routed via a Traefik API Gateway.

## Architecture

- **API Gateway**: Traefik (Routes requests to services)
- **Auth Service**: Handles authentication (Running on port 3000 internally)
- **User Service**: Handles user management (Running on port 3002 internally)
- **Database**: MongoDB Atlas (Cloud)
- **Cache**: Upstash Redis (Cloud)
- **Shared Packages**:
  - `@shared/database` (Prisma ORM)
  - `@shared/logger`
  - `@shared/middlewares`
  - `@shared/types`
  - `@shared/redis` (Redis Client)

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v8+)
- **MongoDB Atlas Account**: You need a MongoDB Atlas cluster.
- **Upstash Redis Account**: You need an Upstash Redis database.

## Getting Started (Docker)

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd distributed-backend-system/backend
    ```

2.  **Configure Environment**:
    Create a `.env` file in the root directory and add your cloud credentials:
    ```bash
    cp .env.example .env
    # Edit .env and set DATABASE_URL and REDIS_URL
    ```

3.  **Start the services**:
    ```bash
    docker compose up --build -d
    ```
    This command will:
    - Build the Docker images for `auth-service` and `user-service`.
    - Start Traefik as the reverse proxy on port `80`.
    - Start the microservices (connected to Atlas & Upstash).

4.  **Verify the setup**:

    - **Traefik Dashboard**: [http://localhost:8080](http://localhost:8080)
    - **Auth Service Health**:
      ```bash
      curl http://localhost/api/auth/v1/health
      ```
    - **User Service Health**:
      ```bash
      curl http://localhost/api/users/v1/health
      ```

## Development

To run the services locally using Docker (Recommended):
- **Hot Reloading**: Enabled via `CHOKIDAR_USEPOLLING`. Changes to `src` files will restart the service automatically.

## API Endpoints

All API requests should be routed through the API Gateway at `http://localhost`.

| Service      | Route Prefix  | Internal Port | Description |
| :---         | :---          | :---          | :---        |
| Auth Service | `/api/auth`   | 3000          | Authentication logic |
| User Service | `/api/users`  | 3002          | User profile management |

## Troubleshooting

### Docker Socket on macOS
If Traefik fails to detect services (common on macOS), this project uses a **static file provider** workaround.
- Configuration: `traefik_dynamic.yml` defines the routes manually.
- Docker Volume: `./traefik_dynamic.yml:/etc/traefik/dynamic_conf.yml`

### Hot Reload Not Working
Ensure `CHOKIDAR_USEPOLLING=true` is set in the service environment (already configured in `docker-compose.override.yml`).
