import argparse
import os
import subprocess

def run_docker_commands(commands):
    for command in commands:
        subprocess.run(command)

def handle_install(machine):
    subprocess.run(['npm', 'install'])
    subprocess.run(['npm', 'run', 'build'])
    dockerfile_path = f"/{machine}/Dockerfile"
    image_tag = f"rusicsvelte:{machine}"
    container_name = f"rusicsvelte{machine.upper()}"
    
    run_docker_commands([
        ['docker', 'build', '-t', image_tag, '-f', dockerfile_path, '.'],
        ['docker', 'run', '-d', '-p', '9090:80', '--name', container_name, image_tag]
    ])

def handle_restart(machine):
    container_name = f"rusicsvelte{machine.upper()}"
    subprocess.run(['docker', 'start', container_name])

def handle_update(machine):
    container_name = f"rusicsvelte{machine.upper()}"
    image_tag = f"rusicsvelte:{machine}"
    dockerfile_path = f"/{machine}/Dockerfile"
    
    run_docker_commands([
        ['docker', 'stop', container_name],
        ['docker', 'rm', container_name],
        ['git', 'pull'],
        ['npm', 'run', 'build'],
        ['docker', 'build', '-t', image_tag, '-f', dockerfile_path, '.'],
        ['docker', 'run', '-d', '-p', '9090:80', image_tag]
    ])

def handle_delete(machine):
    container_name = f"rusicsvelte{machine.upper()}"
    
    run_docker_commands([
        ['docker', 'stop', container_name],
        ['docker', 'rm', container_name],
        ['rm', '-rf', '/usr/share/rusic/*']
    ])

def main():
    parser = argparse.ArgumentParser(description="CLI for Rusic music server.")
    parser.add_argument("-d", "--delete", action="store_true", help="Delete the program")
    parser.add_argument("-i", "--install", action="store_true", help="Install the program")
    parser.add_argument("-r", "--restart", action="store_true", help="Restart the program")
    parser.add_argument("-u", "--update", action="store_true", help="Update the program")

    args = parser.parse_args()
    machine = os.uname().machine

    if args.install:
        if machine in ["armv7l", "aarch64", "x86_64"]:
            handle_install(machine)
        elif machine == "i386":
            print("i386 architecture detected and is not supported.")
            os._exit(1)
        else:
            print("Unknown architecture detected exiting.")
            os._exit(1)
    elif args.restart:
        if machine in ["armv7l", "aarch64", "x86_64"]:
            handle_restart(machine)
        else:
            print("Unknown architecture detected exiting.")
            os._exit(1)
    elif args.update:
        if machine in ["armv7l", "aarch64", "x86_64"]:
            handle_update(machine)
        else:
            print("Unknown architecture detected exiting.")
            os._exit(1)
    elif args.delete:
        if machine in ["armv7l", "aarch64", "x86_64"]:
            handle_delete(machine)
        else:
            print("Unknown architecture detected exiting.")
            os._exit(1)
        print("Deleted Rusic")
    else:
        print("No action specified. Use -i, -u, or -d.")

if __name__ == "__main__":
    main()