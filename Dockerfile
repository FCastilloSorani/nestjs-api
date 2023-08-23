# Base image
FROM node:18.17.1-buster-slim AS base

# Set timezone
ENV TZ="America/Argentina/Salta"

# Set working directory 
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm i 

# Copy the rest of the app
COPY . .

# Build NestJS app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["node /app/dist/main.js"]