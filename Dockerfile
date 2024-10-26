FROM node:20-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
RUN corepack enable

COPY --chown=node:node package.json pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm run build
USER node

CMD ["pnpm", "run", "start:prod"]
