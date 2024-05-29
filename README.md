# rusic-svelte

rusic-svelte is part of the rusicsetup and rusic trio.

You will need to install and run rusicsetup and rusic before rusic-svelte can
be used.

Rusic has been developed specifically for the Raspberry pi 3 and 4.  

![Project Screenshot](screenshot.png "width=450px")

## Prerequisites


1. raspberrypiOS (bookworm)
2. docker


## Usage

Git clone this repository to any folder on your box.
Execute RUN.sh, it will build a docker contianer for the architecture you specify.


```bash
git clone https://github.com/cjsmocjsmo/rusic-svelte.git

#for the rpi3
sh RUN.sh 32 0.0.1

# or if on the rpi4 and above

sh RUN.sh 64 0.0.1
```
And thats it.  You should now have a running docker container


## Updating

To update simply re run RUN.sh with a new version

```bash
sh RUN.sh 32 0.0.2

#or 

sh RUN.sh 64 0.0.2
```

## Warning

Rusic was designed to run on your home network and not on the wider internet.  It has no authentication system so you have been warned!!!