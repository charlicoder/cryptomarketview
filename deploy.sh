#!/bin/bash

# ==== CONFIGURATION ====
APP_NAME="cryptomarketview"
IMAGE_NAME="cryptomarketview-image"
PORT=3000

# ==== STEP 1: Stop and remove old container if running ====
echo "Checking for existing container: $APP_NAME..."

if [ "$(docker ps -q -f name=$APP_NAME)" ]; then
    echo "Stopping running container..."
    docker stop $APP_NAME
fi

if [ "$(docker ps -aq -f name=$APP_NAME)" ]; then
    echo "Removing old container..."
    docker rm $APP_NAME
fi

# ==== STEP 2: Remove old image (optional) ====
if [ "$(docker images -q $IMAGE_NAME)" ]; then
    echo "Removing old image..."
    docker rmi $IMAGE_NAME
fi

# ==== STEP 3: Build new Docker image ====
echo "Building new Docker image..."
docker build -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Exiting."
    exit 1
fi

# ==== STEP 4: Run new container ====
echo
