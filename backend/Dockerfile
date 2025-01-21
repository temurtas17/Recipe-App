# Base image
FROM node:20

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Copy entrypoint script
COPY entrypoint.sh /app/

# Give execute permission to the entrypoint script
RUN chmod +x /app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 5000

# Set entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]