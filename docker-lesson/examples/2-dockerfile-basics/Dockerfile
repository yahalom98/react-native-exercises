# Use official Node.js runtime as base image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define command to run
CMD ["node", "app.js"]

