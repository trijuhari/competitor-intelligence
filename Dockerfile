# Multi-stage Dockerfile for Competitor Intelligence BRI vs Himbara
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install all dependencies (including devDependencies required for vite build)
RUN npm install

# Copy application source code
COPY . .

# Build frontend production bundle into dist/
RUN npm run build

# Ensure persistent SQLite data directory exists
RUN mkdir -p /app/data

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose web & API port
EXPOSE 3000

# Volume mount point for persistent SQLite database
VOLUME ["/app/data"]

# Run unified backend & frontend server
CMD ["node", "server/index.js"]
