FROM node:9.3.0

WORKDIR /usr/modafoca

# Install dependencies during build to benefit from cache.
## COPY package.json package-lock.json ./
## RUN npm install

COPY ./ ./

# To execute local commands like `gulp`.
ENV PATH "$PATH:./node_modules/.bin/"
