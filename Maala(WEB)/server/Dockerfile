# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from build stage
COPY --from=build /app/src ./src

# Copy environment variables
COPY .env.production .env

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 