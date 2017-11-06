# TODO: https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

# Install PM2
RUN yarn global add pm2

# Install server dependencies
ADD /server/package.json /server/yarn.lock /tmp/server/
RUN cd /tmp/server && yarn
RUN mkdir server
RUN cd server && ln -s /tmp/server/node_modules

# Copy server code
COPY ./server ./server

# Expose port
EXPOSE 8080

# Run app
CMD cd server && yarn start

# TODO: https://github.com/krallin/tini#using-tini
# # Add Tini
# ENV TINI_VERSION v0.16.1
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# RUN chmod +x /tini
# ENTRYPOINT ["/tini", "--"]

# # Run your program under Tini
# CMD ["/your/program", "-and", "-its", "arguments"]