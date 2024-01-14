###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV production

RUN pnpm install --prod && pnpm cache clear --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/entrypoint.sh .

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD [ "node", "dist/main.js" ]
