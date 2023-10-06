# Use the official Node.js 14 image as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Expose a port that the app will listen on
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run", "start" ]
