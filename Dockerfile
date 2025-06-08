# Use lightweight Node.js base image
FROM node:20-alpine

# Label for authorship (optional)
LABEL authors="y0ncha"

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the internal port
EXPOSE 8496

# Define the command to start the app
CMD ["node", "server.js"]