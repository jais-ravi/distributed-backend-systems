FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Development Stage
FROM base AS dev
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/auth-service/package.json apps/auth-service/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
WORKDIR /app/apps/auth-service
# Generate Prisma Client inside container
RUN pnpm --filter @shared/database db:generate
CMD ["pnpm", "dev"]

# Builder Stage
FROM base AS builder
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @shared/database db:generate
RUN pnpm --filter auth-service deploy --legacy /prod/auth-service
WORKDIR /prod/auth-service
COPY tsconfig.base.json /tsconfig.base.json
RUN pnpm build

# Production Stage
FROM base AS prod
WORKDIR /app
COPY --from=builder /prod/auth-service/dist dist
COPY --from=builder /prod/auth-service/node_modules node_modules
COPY --from=builder /prod/auth-service/package.json package.json
ENV PORT=3000
EXPOSE 3000
CMD [ "node", "dist/server.js" ]
