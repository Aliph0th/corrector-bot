FROM node:20-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
RUN corepack enable

COPY --chown=node:node package.json pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile

COPY --chown=node:node . .
USER node

RUn pnpm run build

CMD ["pnpm", "run", "start:prod"]
