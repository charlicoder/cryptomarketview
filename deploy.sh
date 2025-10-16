#!/bin/bash

APP_NAME="cryptomarketview"
PORT=3001

echo "-----------------------------"
echo "Deploying $APP_NAME on port $PORT"
echo "-----------------------------"

# Step 1: Pull latest code
echo "Pulling latest code..."
git stash
git checkout main
git pull origin main

# Step 2: Install dependencies
echo "Installing dependencies..."
npm install

# Step 3: Build the app
echo "Building Next.js app..."
npm run build

# Step 4: Start/Restart with PM2
echo "Starting $APP_NAME with PM2 on port $PORT..."
pm2 start npm --name "$APP_NAME" -- run start -- -p $PORT || pm2 restart "$APP_NAME"

# Step 5: Save PM2 process list for startup
pm2 save

echo "Deployment completed successfully!"
pm2 status "$APP_NAME"
