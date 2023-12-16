# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN npm run build

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8000

# Run the web service on container startup.
CMD ["npm", "run", "serve"]
