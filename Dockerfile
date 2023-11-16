FROM node:18

# Create app directory
RUN mkdir /usr/src/app
RUN chown node /usr/src/app

# Make the container's directory structure
USER node

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY server/package.json ./
COPY server/package-lock.json ./
RUN npm install

# Expose Port
EXPOSE 3000

# for development
CMD ["npm", "run", "dev"]

# for production
#CMD ["npm", "run", "start"]