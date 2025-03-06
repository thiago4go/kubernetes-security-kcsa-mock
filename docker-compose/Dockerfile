# 🔹 Phase 1: Build (dependency installation and application build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy essential files before installation
COPY ../package.json ../package-lock.json ./

# Change permissions to avoid installation issues
RUN chown -R node:node /app

# Run as node user
USER node

# Install ALL dependencies (including devDependencies)
RUN npm ci --include=dev

# Copy application files
COPY --chown=node:node ../ . 

# Build the application
RUN npm run build

# 🔹 Phase 2: Runtime (minimal final image)
FROM node:20-alpine

WORKDIR /app

# Copy only essential files from the build phase
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Install `serve` globally before switching user
RUN npm install -g serve

# Set a non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 3000

# Entry command to run the application in production
CMD ["serve", "-s", "build", "-l", "3000", "--single"]