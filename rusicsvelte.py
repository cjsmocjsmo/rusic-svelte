import argparse
import os
import subprocess

CWD = os.getcwd()

def rusicsvelte_install(version, docker_file, arch):
    subprocess.run(['npm', 'install'])
    subprocess.run(['npm', 'run', 'build'])
    subprocess.run(['docker', 'build', '-t', f'rusicsvelte{arch}:{version}', '-f', docker_file, '.'])
    subprocess.run(['docker', 'run', '-d', '-p', '9090:80', f'rusicsvelte{arch}:{version}'])

def rusicsvelte_update(version, arch):
    subprocess.run(['docker', 'stop', f'rusicsvelte{arch}'])
    subprocess.run(['docker', 'rm', f'rusicsvelte{arch}'])
    subprocess.run(['git', 'pull'])
    subprocess.run(['npm', 'run', 'build'])
    subprocess.run(['docker', 'build', '-t', f'rusicsvelte{arch}:{version}', '-f', f'Dockerfile{arch}', '.'])
    subprocess.run(['docker', 'run', '-d', '-p', '9090:80', f'rusicsvelte{arch}:{version}'])

def rusicsvelte_uninstall(version, arch):
    subprocess.run(['docker', 'stop', f'rusicsvelte{arch}'])
    subprocess.run(['docker', 'rm', f'rusicsvelte{arch}'])
    # subprocess.run(['docker', 'rmi', f'rusicsvelte{arch}:{version}'])


def main():
    parser = argparse.ArgumentParser(description="CLI for Rusic music server.")
    parser.add_argument("version", type=str, help="Version of the software")
    parser.add_argument("-i", "--install", action="store_true", help="Install the program")
    parser.add_argument("-u", "--update", action="store_true", help="Update the program")
    parser.add_argument("-d", "--delete", action="store_true", help="Delete the program")

    args = parser.parse_args()

    docker_32_file = os.path.join(CWD, "RPI", "32", "Dockerfile")
    docker_64_file = os.path.join(CWD, "RPI", "64", "Dockerfile")

    arch = None

    if os.uname().machine == "armv7l":
        subprocess.run(["cp", "-pvr", docker_32_file, CWD])
        arch = "32"
    elif os.uname().machine == "aarch64":
        subprocess.run(["cp", "-pvr", docker_64_file, CWD])
        arch = "64"
    else:
        print("Invalid architecture. Use 32 or 64.")

    if args.install:
        print(f"Installing Rusic:{args.version}")
        rusicsvelte_install(args.version, docker_64_file, arch)
    elif args.update:
        print(f"Updating Rusic:{args.version}")
        rusicsvelte_update(args.version, docker_64_file, arch)
    elif args.delete:
        print(f"Deleting Rusic:{args.version}")
        rusicsvelte_uninstall(args.version, docker_64_file, arch)
    else:
        print("No action specified. Use -i, -u, or -d.")
    

if __name__ == "__main__":
    main()