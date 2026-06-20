# rusic-svelte

rusic-svelte is the front end for the rusic music server.

Rusic has been developed specifically for the Raspberry pi 3b+, 4  and 5.  

![Project Screenshot](screenshot.png "width=450px")

## Prerequisites

1. raspberrypiOS (bookworm/trixie)
2. docker installed and running


## Usage

Git clone this repository to any folder on your box, and then execute Setup.py.


```bash
cd /usr/share/rusic

git clone https://github.com/cjsmocjsmo/rusic-svelte.git

python3 Setup.py -i 


## Updating

Updating is a work in progress


## Warning

Rusic was designed to run on your home network and not on the wider internet.
It has no authentication system or TLS support so you have been warned!!!