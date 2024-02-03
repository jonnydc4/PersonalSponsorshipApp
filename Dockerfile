FROM node:18

# Create app directory
RUN mkdir /usr/src/app
#RUN chown node /usr/src/app

# Make the container's directory structure
#USER node

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Change ownership to 'node' user and switch to it
RUN chown node /usr/src/app
USER node


# Expose Port
EXPOSE 3000

# for development
CMD ["npm", "run", "dev"]

# for production
#CMD ["npm", "run", "start"]