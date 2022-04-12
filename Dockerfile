FROM node:14-buster

# Create app directory for Node.js application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN yarn

# Bundle app source
COPY . /usr/src/app

# Run nodemon
CMD ["/bin/bash", "-c", "./docker_run_env.sh"]
