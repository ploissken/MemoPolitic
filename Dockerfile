FROM node:9.3.0

RUN mkdir -p /usr/memoria-politica/
WORKDIR /usr/memoria-politica/

## Install dependencies during build to benefit from cache.
## COPY package.json package-lock.json ./
## RUN npm install

COPY ./ ./

# To execute local commands like `gulp`.
ENV PATH "$PATH:/usr/memoria-politica/node_modules/.bin/"
