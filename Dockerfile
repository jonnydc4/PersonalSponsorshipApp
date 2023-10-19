FROM node:14

# Create app directory
RUN mkdir /usr/src/app
RUN chown node /usr/src/app

# Make the container's directory structure
USER node
RUN mkdir /usr/src/app/server
RUN mkdir /usr/src/app/client
RUN mkdir /usr/src/app/client/build

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Expose Port
EXPOSE 3000

# for development
CMD ["npm", "run", "dev"]

# for production
#CMD ["npm", "run", "start"]