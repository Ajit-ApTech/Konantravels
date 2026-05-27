# Use official Node.js runtime as parent image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production only to keep image size small)
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Hugging Face Spaces runs on port 7860 by default
ENV PORT=7860
ENV NODE_ENV=production

# Expose the port
EXPOSE 7860

# Command to start the server
CMD ["node", "server.js"]
