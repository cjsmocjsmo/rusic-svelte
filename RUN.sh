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
  cp -pvr RPI/32/Dockerfile .

  # Stop and remove all rusicsvelte containers
  docker stop $(docker ps -aq --filter "name=rusicsvelte")
  # docker rm $(docker ps -aq --filter "name=rusicsvelte")

  git pull https://github.com/cjsmocjsmo/rusic-svelte.git

  npm install

  # Build rusic
  npm run build

  # Build the docker image
  docker build -t rusicsvelte:"$1" .

  # Deploy image
  docker run -d -p 9090:80 rusicsvelte:"$1"

  rm Dockerfile

else

  cp -pvr RPI/64/Dockerfile .
  # Stop and remove all rusicsvelte containers
  docker stop $(docker ps -aq --filter "name=rusicsvelte")
  # docker rm $(docker ps -aq --filter "name=rusicsvelte")

  git pull https://github.com/cjsmocjsmo/rusic-svelte.git

  npm install
  # Build rusic
  npm run build

  # Build the docker image
  docker build -t rusicsvelte:"$1" .

  # Deploy image
  docker run -d -p 9090:80 rusicsvelte:"$1"

  rm Dockerfile
fi