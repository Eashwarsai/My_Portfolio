# ============================================================
# React + Vite Frontend Dockerfile (Multi-stage Build)
# ============================================================
# WHAT: Recipe to build and serve the production frontend.
# WHY:  We don't need Node.js in production! We only need it to build 
#       the static HTML/JS/CSS files. 
# HOW:  Multi-stage builds. 
#       Stage 1 (build): Uses Node to install npm packages and run `npm build`.
#       Stage 2 (serve): Uses Nginx (a fast web server) to serve the built files.

# ── Stage 1: Build ──
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
# We need to set the API URL for the production build
# This will be replaced by Vercel in actual production, but useful if serving via Docker directly
RUN npm run build

# ── Stage 2: Serve (Production Environment) ──
FROM nginx:alpine

# Copy the built abstract files from the builder stage over to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (handles React Router client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
