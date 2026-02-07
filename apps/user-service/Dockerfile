FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Development Stage
FROM base AS dev
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/user-service/package.json apps/user-service/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
WORKDIR /app/apps/user-service
# Generate Prisma Client inside container
RUN pnpm --filter @shared/database db:generate
CMD ["pnpm", "dev"]

# Builder Stage
FROM base AS builder
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @shared/database db:generate
RUN pnpm --filter user-service deploy --legacy /prod/user-service
WORKDIR /prod/user-service
COPY tsconfig.base.json /tsconfig.base.json
RUN pnpm build

# Production Stage
FROM base AS prod
WORKDIR /app
COPY --from=builder /prod/user-service/dist dist
COPY --from=builder /prod/user-service/node_modules node_modules
COPY --from=builder /prod/user-service/package.json package.json
ENV PORT=3002
EXPOSE 3002
CMD [ "node", "dist/server.js" ]
