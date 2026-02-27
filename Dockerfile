FROM node:20-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk add --no-cache libc6-compat #Needed to run Turbo, apparently.
WORKDIR /app

COPY . .
RUN pnpm install

CMD ["turbo", "run", "dev", "--filter=my-app"]