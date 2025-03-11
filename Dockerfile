FROM node:20-alpine

WORKDIR /app

# Copy only package files first to optimize caching
COPY package.json package-lock.json* ./

# Ensure fresh dependencies
RUN npm cache clean --force && rm -rf node_modules && npm install --legacy-peer-deps

# Reinstall esbuild explicitly (Fixes some Vite build issues)
RUN npm rebuild esbuild

# Install serve globally for serving static files
RUN npm i -g serve

# Copy the rest of the project files
COPY . .

# Pass environment variables for Vite during build
ARG VITE_APP_WRITE_PROJECT_ID_PROD
ARG VITE_APP_WRITE_PROJECT_ID_DEV
ARG VITE_APP_WRITE_ENDPOINT_PROD
ARG VITE_APP_WRITE_ENDPOINT_DEV
ARG VITE_APP_WRITE_BUCKET_ID_PROD
ARG VITE_APP_WRITE_BUCKET_ID_DEV
ARG VITE_API_URL_PROD
ARG VITE_API_URL_DEV

# Run the Vite build process with build-time variables
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Start the static server
CMD [ "serve", "-s", "dist" ]
