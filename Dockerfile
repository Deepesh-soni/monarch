# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies using Yarn (with a frozen lockfile for reproducibility)
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app (this runs "next build")
RUN yarn build

# Stage 2: Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built files and dependencies from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/node_modules ./node_modules

# Expose the default Next.js port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV production

# Start the Next.js server
CMD ["yarn", "start"]
