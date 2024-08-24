import argparse
import os
import subprocess

CWD = os.getcwd()

def install(version, docker_file, arch):
    subprocess.run(['npm', 'install'])


def main():
    parser = argparse.ArgumentParser(description="CLI for Rusic music server.")
    parser.add_argument("version", type=str, help="Version of the software")
    parser.add_argument("-i", "--install", action="store_true", help="Install the program")
    parser.add_argument("-u", "--update", action="store_true", help="Update the program")
    parser.add_argument("-d", "--delete", action="store_true", help="Delete the program")

    args = parser.parse_args()

    
    docker_32_file = os.path.join(CWD, "RPI", "32", "Dockerfile")
    docker_64_file = os.path.join(CWD, "RPI", "64", "Dockerfile")
    print(docker_32_file)
    print(docker_64_file)

    if os.uname().machine == "armv7l":
        subprocess.run(["cp", "-pvr", docker_32_file, CWD])
        arch = "32"
        if args.install:
            print(f"Installing Rusic:{args.version}")
            rusic_install(args.version, docker_32_file, arch)
        elif args.update:
            print(f"Updating Rusic:{args.version}")
            rusic_update(args.version, docker_32_file, arch)
        elif args.delete:
            print(f"Deleting Rusic:{args.version}")
            rusic_delete(args.version, arch)
        else:
            print("No action specified. Use -i, -u, or -d.")
    elif os.uname().machine == "aarch64":
        subprocess.run(["cp", "-pvr", docker_64_file, CWD])
        arch = "64"
        if args.install:
            print(f"Installing Rusic:{args.version}")
            rusic_install(args.version, docker_64_file, arch)
        elif args.update:
            print(f"Updating Rusic:{args.version}")
            rusic_update(args.version, docker_64_file, arch)
        elif args.delete:
            print(f"Deleting Rusic:{args.version}")
            rusic_delete(args.version, docker_64_file, arch)
        else:
            print("No action specified. Use -i, -u, or -d.")
    else:
        print("Invalid architecture. Use 32 or 64.")

if __name__ == "__main__":
    main()