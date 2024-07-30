# Use the official Node.js image as the base image
FROM node:latest



# Set the working directory inside the container

RUN  mkdir /src

WORKDIR /src

COPY ./src ./src


# Copy package.json and package-lock.json (if available)
COPY ./src/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code

# Expose the port on which your Node.js application will run

# Command to run your Node.js application
CMD ["npm", "start"]