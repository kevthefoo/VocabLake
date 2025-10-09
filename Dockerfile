# Use official Node.js image
FROM node:latest-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose port (default for Next.js dev)
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]