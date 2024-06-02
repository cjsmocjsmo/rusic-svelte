#!/bin/bash

# Check if there are at least two arguments provided
if [ "$#" -ne 2 ]; then
    echo "You must enter exactly 2 arguments:\n\tarchitecture (32 or 64) and version (e.g., 0.0.1)"
    exit 1
fi

# Check if the first argument is either 32 or 64
# If not, print an error message and exit the script
if [ "$1" != "32" ] && [ "$1" != "64" ]; then
    echo "The first argument must be either 32 or 64"
    exit 1
fi

# Check if the second argument is a valid version string
# If not, print an error message and exit the script
if ! echo "$2" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
    echo "The second argument must be a valid version string (e.g., 0.0.1)"
    exit 1
fi

# If all checks pass, print the arguments
echo "Architecture: $1"
echo "Version: $2"

if [ "$1" = "32" ]; then
    if [ "$(uname -m)" = "aarch64" ]; then
        echo "ERROR: This is a 64-bit ARM system."
        exit 1
    fi
fi

if [ "$1" = "64" ]; then
    if [ "$(uname -m)" = "armv7l" ]; then
        echo "ERROR: This is a 32-bit ARM system."
        exit 1
    fi
fi

# Stop the running rusic container if it exists
container=rusicsvelte:"$2"
echo container=$container
if [ "$container" != "" ]; then
    RUNNING_CONTAINERS=$(docker ps -af status=running --format 'image={{.Image}}')
    if echo "$RUNNING_CONTAINERS" | grep -q "$container"; then
        echo "A container with the name $container\n is already running STOPPING IT NOW"
        # stop the container with the image name $container
        docker stop $(docker ps -q --filter ancestor=$container)
    else
        echo "No container with the name $container is running"
    fi
fi

if [ "$1" = "32" ]; then
  cp -pvr RPI/32/Dockerfile .
fi

if [ "$1" = "64" ]; then
  cp -pvr RPI/64/Dockerfile .
fi

  # Stop and remove all rusicsvelte containers
docker stop $(docker ps -aq --filter "name=rusicsvelte")

# docker rm $(docker ps -aq --filter "name=rusicsvelte")
git pull https://github.com/cjsmocjsmo/rusic-svelte.git

npm install

# Build rusic
npm run build

# Build the docker image
docker build -t "rusicsvelte:$1" .

# Deploy image
docker run -d -p 9090:80 "rusicsvelte:$1"

rm Dockerfile

