# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for Playwright
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Playwright environment variables
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV DOCKER=1

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create directories for test results and reports
RUN mkdir -p test-results playwright-report

# Expose port (if needed for reports)
EXPOSE 9323

# Default command
CMD ["npm", "test"]