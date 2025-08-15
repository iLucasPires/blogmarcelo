Hello, in this tutorial, I'll show you how to run xfstests on a custom kernel. I needed to do this because I made a change to the fs subsystem and needed to understand how to run the tests after that change. Since it was a difficult task, I decided to repeat it a few times to understand how to do it and be able to teach you step by step. Also, I'd like to remind everyone not to make the same mistake I did by not properly testing a change made to the kernel. Don't just test build and boot. 


---
### **Step 1: Kernel Compilation and Environment Setup on the Host Machine**

1.  **Install Necessary Tools:**
    ```bash
    sudo dnf install build-essential ncurses-devel flex bison openssl-devel libssl-devel dkms elfutils-libelf-devel libudev-devel pciutils-devel python3-devel qemu-system-x86 debootstrap rsync
    ```
    This command installs all the tools needed to compile the kernel and set up a virtual machine.
*use your distro's package manager (e.g., `apt`).*

2.  **Configure and Compile the Kernel:**
    Navigate to the root directory of your kernel source code.

    ```bash
    make menuconfig
    ```
    This command launches a menu configuration for your kernel.

    Inside **`menuconfig`**, you need to ensure some key variables are set. You can use the search function by pressing `/` and typing the variable name. Make sure each of these is enabled with `Y` (built directly into the kernel, not as a module).

    * `CONFIG_XFS_FS`
    * `CONFIG_E1000E`
    * `CONFIG_VIRTIO_NET`
    * `CONFIG_VIRTIO_PCI`
    * `CONFIG_NET_FAILOVER`
    * `CONFIG_E1000`

    After saving the configuration, compile the kernel and headers:

    ```bash
    make -j$(nproc)
    ```

    ```bash
    make headers_install INSTALL_HDR_PATH=/tmp/kernel-headers
    ```
    This command installs the kernel header files to a temporary directory. These headers are needed to compile the `xfstests` tool inside the VM.

3.  **Create and Prepare Disk Images:**
    Here, we're going to create three files that will serve as the virtual hard drives for our QEMU machine. The first will be our main disk, while the other two are for the `xfstests`.

    ```bash
    dd if=/dev/zero of=disk.img bs=1M count=20480
    ```
    First, we create a 20 GB file named `disk.img` using `dd`. This will be the home for our operating system.

    ```bash
    mkfs.ext4 disk.img
    ```
    Now we have to format this disk with the `ext4` filesystem. This turns our empty file into a real, usable partition, ready to hold files and folders.

    ```bash
    xfs_io -f -c "falloc 0 10g" test.img
    ```
    We use `xfs_io` to create a 10 GB file that will be our primary test disk.

    ```bash
    mkfs.xfs test.img
    ```
    Since we are testing the XFS filesystem, we format this disk with `mkfs.xfs`.

    ```bash
    xfs_io -f -c "falloc 0 10g" scratch.img
    ```
    We create a second 10 GB disk for temporary files. We don't format this one, as the `xfstests`  will handle that itself when needed.

4.  **Install the Base System on the Main Image and Set the Root Password:**

    ```bash
    mkdir -p qemu-rootfs
    sudo mount disk.img qemu-rootfs
    sudo debootstrap --arch=amd64 bookworm qemu-rootfs http://deb.debian.org/debian/
    sudo chroot qemu-rootfs /bin/bash
    ```
    This command places you in a `chroot` environment inside the new system.

    ```bash
    passwd
    ```
    This command will prompt you to create a new password for the `root` user, which you will need to log in to the VM later. Type `exit` to leave the `chroot` environment.

    ```bash
    sudo umount qemu-rootfs
    ```

5.  **Copy Kernel Headers to the Image:**

    ```bash
    sudo mount disk.img qemu-rootfs
    sudo rsync -av /tmp/kernel-headers qemu-rootfs/usr/src/
    sudo umount qemu-rootfs
    ```
    These commands copy the compiled kernel headers into the VM's filesystem.

---
### **Step 2: Running the Virtual Machine (VM)**

Start the VM using your custom-compiled kernel and the prepared disks.

```
qemu-system-x86_64 \
-kernel <path_to_ur_kernel>arch/x86/boot/bzImage \
-hda disk.img \
-hdb test.img \
-hdc scratch.img \
-netdev user,id=mynet0 \
-device e1000,netdev=mynet0 \
-append "root=/dev/sda rw console=ttyS0" \
-nographic \
-smp 2 \
-m 2G 
```

### **Step 3: Configuration Inside the VM**

After the VM boots, log in as the **`root`** user with the password you just created.

1.  **Configure the Network:**

    ```bash
    ip link show
    ```
    This command lists all network interfaces. Find the name of the virtual network device (usually `ens3`) to use in the following commands.

    ```bash
    ip link set ens3 up
    dhclient ens3
    echo "nameserver 8.8.8.8" > /etc/resolv.conf
    ```
    These commands enable the network interface, get an IP address, and configure the DNS server.

2.  **Install Packages and Build Tools:**

    ```bash
    apt-get update
    apt-get install -y pkg-config autoconf libtool
    apt-get install -y acl attr automake bc dbench dump e2fsprogs fio gawk \
        gcc git indent libacl1-dev libaio-dev libcap-dev libgdbm-dev libtool \
        libtool-bin liburing-dev libuuid1 lvm2 make psmisc python3 quota sed \
        uuid-dev uuid-runtime xfsprogs xfslibs-dev sqlite3 libgdbm-compat-dev
    ```
    These commands install all dependencies for compiling `xfstests`.

3.  **Clone and Compile `xfstests`:**

    ```bash
    git clone https://git.kernel.org/pub/scm/fs/xfs/xfstests-dev.git
    cd xfstests-dev
    make
    ```
    These commands download and compile the test suite.

4.  **Configure the Test Devices:**

    ```bash
    mkdir -p /mnt/test
    mkdir -p /mnt/scratch
    mount /dev/sdb /mnt/test
    cp local.config.example local.config
    ```
    Next, edit the **`local.config`** file with `vim`:

    ```
    export TEST_DEV=/dev/sdb
    export TEST_DIR=/mnt/test
    export SCRATCH_DEV=/dev/sdc
    export SCRATCH_MNT=/mnt/scratch
    export FSTYP=xfs
    ```
    This configuration file tells `xfstests` which devices to use for testing.

---
### **Step 4: Running the Tests**

With everything configured, you can now run the tests to validate your changes.

* **For all automated XFS tests:**
    ```bash
    ./check -g auto
    ```

* **For specific tests related to `xfs/scrub`:**
    ```bash
    ./check xfs/001
    ```

