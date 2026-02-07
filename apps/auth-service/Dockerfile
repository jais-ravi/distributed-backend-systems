FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter auth-service deploy --legacy /prod/auth-service
WORKDIR /prod/auth-service
COPY tsconfig.base.json /tsconfig.base.json
RUN pnpm build


FROM base AS runner
WORKDIR /app
COPY --from=builder /prod/auth-service /app
ENV PORT=3000
EXPOSE 3000
CMD [ "node", "dist/server.js" ]
