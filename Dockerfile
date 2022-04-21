FROM node:16.12.0

# Create app directory
RUN mkdir -p /usr/src/unpdf_sign_ms
WORKDIR /usr/src/unpdf_sign_ms

# Install app dependencies
COPY package.json /usr/src/unpdf_sign_ms
RUN npm install

# Bundle app source
COPY . /usr/src/unpdf_sign_ms

# Build arguments
ARG NODE_VERSION=16.12.0

# Environment
ENV NODE_VERSION $NODE_VERSION
