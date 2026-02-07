FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter user-service deploy --legacy /prod/user-service
WORKDIR /prod/user-service
COPY tsconfig.base.json /tsconfig.base.json
RUN pnpm build


FROM base AS runner
WORKDIR /app
COPY --from=builder /prod/user-service /app
ENV PORT=3002
EXPOSE 3002
CMD [ "node", "dist/server.js" ]
