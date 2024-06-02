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

git pull https://github.com/cjsmocjsmo/rusic-svelte.git;

if [ "$1" = "32" ]; then
  cp -pvr RPI/32/Dockerfile .
fi

if [ "$1" = "64" ]; then
  cp -pvr RPI/64/Dockerfile .
fi

count1=$(echo "$2" | sed 's/\.//g' )
count=$((count1+1-1))
minusone=$((count-1))
echo "Version: $2";
echo "rusicsvelte:$2";
echo "rusicsvelte$count";
echo "rusicsvelte$minusone";

if [ "$minusone" = "0" ]; then
    npm install;

    npm run build;

    docker build -t rusicsvelte:$1 .;
    
    docker run --name rusicsvelte1 -d -p 8090:8090 rusicsvelte:$1;

    exit 0;
fi

if [ "$minusone" = "1" ]; then
    docker stop rusicsvelte1;

    docker rm rusicsvelte1;

    npm install;

    npm run build;

    docker build -t rusicsvelte:$1 .;

    docker run --name rusicsvelte$count -d -p 8090:8090 rusicsvelte:$1;

    exit 0;
fi

if [ "$minusone" > "1" ]; then
    docker stop rusicsvelte$minusone;

    docker rm rusicsvelte$minusone;

    npm install;

    npm run build;

    docker build -t rusicsvelte:$1 .;

    docker run --name rusicsvelte$count -d -p 8090:8090 rusicsvelte:$1;

    exit 0;
fi