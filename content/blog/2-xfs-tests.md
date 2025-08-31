# #2 XFS Tests

Hello, in this tutorial, I'll show you how to run xfstests on a custom kernel. I needed to do this because I made a change to the fs subsystem and needed to understand how to run the tests after that change. Since it was a difficult task, I decided to repeat it a few times to understand how to do it and be able to teach you step by step. Also, I'd like to remind everyone not to make the same mistake I did by not properly testing a change made to the kernel. Don't just test build and boot. 


---
### **Step 1: Kernel Compilation and Environment Setup on the Host Machine**

First, let’s set up our environment by installing some tools we’ll need along the way. Just like a good hitchhiker of the galaxy, we always need to prepare our backpack before setting off—take everything that might be necessary. Here they are:

1.  **Install Necessary Tools:**
   ```bash
   sudo dnf install build-essential ncurses-devel flex bison openssl-devel libssl-devel dkms elfutils-libelf-devel libudev-devel pciutils-devel python3-devel qemu-system-x86 debootstrap rsync
   ```
*use your distro's package manager (e.g., `apt`).*

2.  **Setting up the kernel config: **
When compiling your kernel, you can choose exactly which features it will support. This is done through the kernel config file (`.config` in the root of the kernel source tree). For our case, use `make menuconfig`; this will open a simple but powerful menu to configure your kernel.

   ```bash
   make menuconfig
   ```

   Inside **`menuconfig`**, you need to ensure some key variables are set. You can use the search function by pressing `/` and typing the variable name, and then by pressing `1` on your keyboard, you will navigate to the variable.. Make sure each of these is enabled with `Y` (built directly into the kernel, not as a module).

* `CONFIG_XFS_FS`
* `CONFIG_E1000E`
* `CONFIG_VIRTIO_NET`
* `CONFIG_VIRTIO_PCI`
* `CONFIG_NET_FAILOVER`
* `CONFIG_E1000`

After saving the configuration, compile the kernel and headers. We gonna installs the kernel header files to a temporary directory. These headers are needed to compile the xfstests tool inside the VM.

   ```bash
   make -j$(nproc)
   ```

   ```bash
   make headers_install INSTALL_HDR_PATH=/tmp/kernel-headers
   ```


3.  **Create and Prepare Disk Images:**
   Here, we're going to create three files that will serve as the virtual hard drives for our QEMU machine. The first will be our main disk, while the other two are for the `xfstests`.


   First, we create a 20 GB file named `disk.img` using `dd`. This will be the home for our operating system.

   ```bash
   dd if=/dev/zero of=disk.img bs=1M count=20480
   ```
   Now we have to format this disk with the `ext4` filesystem. This turns our empty file into a real, usable partition, ready to hold files and folders.
   ```bash
   mkfs.ext4 disk.img
   ```
   We use `xfs_io` to create a 10 GB file that will be our primary test disk.
   

   ```bash
   xfs_io -f -c "falloc 0 10g" test.img
   ```
   Since we are testing the XFS filesystem, we format this disk with `mkfs.xfs`.

   ```bash
   mkfs.xfs test.img
   ```
   

   ```bash
   xfs_io -f -c "falloc 0 10g" scratch.img
   ```
   

4.  **Install the Base System on the Main Image and Set the Root Password:**

We have successfully created a file that represents a partition, so let’s mount it. For this step, I suggest creating a directory to serve as the mount point.

```
mkdir -p qemu-rootfs
sudo mount disk.img qemu-rootfs
```

Normally Debian is used for testing the kernel, so that will be the distro we will be using on our VM for testing our kernel. We will use a tool called `debootstrap` to create a Debian root filesystem (_rootfs_) within `disk.img`

```
sudo debootstrap --arch=amd64 bookworm qemu-rootfs http://deb.debian.org/debian/
```

Right now, the Debian filesystem is fully set up and includes the usual tools you’d expect from a regular Debian installation (browse the `qemu-rootfs` folder to see them). To work inside this environment, we can use a command called **chroot** (change root), which lets us switch into that filesystem. Keep in mind that running it requires `sudo` access

```
sudo chroot qemu-rootfs /bin/bash
```
Now you can navigate through the directories using `ls` and check the kernel version with `uname -r`, but the most important thing we need to do now is set a password for the root user. This will allow us to log in as root with our own password.

  ```bash
   passwd
 ```
  This command will prompt you to create a new password for the `root` user, which you will need to log in to the VM later. Type `exit` to leave the `chroot` environment.


5.  **Copy Kernel Headers to the Image:**


  These commands copy the compiled kernel headers into the VM's filesystem and unmount it .
  ```bash
  sudo rsync -av /tmp/kernel-headers qemu-rootfs/usr/src/
  sudo umount qemu-rootfs
  ```

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

Before we can install the tools we need, we must configure the network for our VM. This involves manually setting up the IP address. 


List all network interfaces to find the name of the virtual network device (for example `ens3`):

   ```bash
  ip link show
```
Enable the network interface
 ```
ip link set ens3 up
```
Obtain an IP address via DHCP
```
dhclient ens3
```
Set the DNS server so your VM can resolve domain names
```
echo "nameserver 8.8.8.8" > /etc/resolv.conf
```
After these steps, your VM will have network connectivity and you can proceed to install the required tools.




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

* **For specific tests related to:**
   ```bash
   ./check xfs/001
   ```