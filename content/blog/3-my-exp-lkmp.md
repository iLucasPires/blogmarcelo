# #3 My Experience with Linux Kernel Bug Fixing Program

The LKMP is a mentorship program that aims to train new contributors to the Linux Kernel. This program is offered by the Linux Foundation and is mentored by an expert on the subject, usually a well-known maintainer in the community. In my case, the mentor was [Shuah Khan](https://youtu.be/9z9zHJCmpUs?si=ceUR1UgpVGnbnB1I), the first female kernel developer to become Linux Foundation fellow. We had weekly meetings on Wednesdays, and in these meetings Shuah answered the mentees' questions and give us tips on where we could make contributions. It was a very cool experience. Shuah is a very kind and helpful person, and getting to know people in the community has been a great experience. More details about the program and how to participate  can be found on the official [LKMP wiki](https://wiki.linuxfoundation.org/lkmp).

## My contributions
In the beginning, my experience with contributions was a bit difficult. We were advised to look for bugs in [Syzkaller](https://syzkaller.appspot.com/upstream) and choose a favorite subsystem to contribute to. For me, the biggest difficulties were balancing everything with my job and reproducing the bugs in the kernel I had compiled. In the end, I decided to try a different approach: instead of fixing bugs, I looked for new things to contribute.

During one of the meetings, Shuah sent a link to the issues on the **[Rust-for-Linux](https://github.com/Rust-for-Linux/linux/issues)** project, and that's where I had the most fun. The maintainers are super friendly, and there's a lot to do, which makes it the perfect start for anyone beginning to contribute.

I would like to give a special thanks to **[Benno Lossin](https://github.com/BennoLossin)** and **[Danilo Krummrich](https://lpc.events/event/18/contributions/1911/author/2860)**, who followed the entire evolution of my series of three patches until it reached version 8, Thanks, guys! And a big thank you to the entire **Rust-for-Linux** project team who interacted with me, including **[Alice Ryhl](https://ryhl.io/)** and **[Miguel Ojeda](https://ojeda.dev/)**. Thank you very much! 
In addition to these three patches, I also made two others that involve a modernization in the Linux Kernel to replace `strncpy`, which was also one of [Shuah's tips](https://github.com/KSPP/linux/issues/90) during our meetings.

### Rust-for-linux
- https://lore.kernel.org/rust-for-linux/20250726183552.23098-1-marcelomoreira1905@gmail.com/
- https://lore.kernel.org/rust-for-linux/20250726183552.23098-2-marcelomoreira1905@gmail.com/
- https://lore.kernel.org/rust-for-linux/20250726183552.23098-3-marcelomoreira1905@gmail.com/
- https://lore.kernel.org/rust-for-linux/20250726183552.23098-4-marcelomoreira1905@gmail.com/

### Replace strncpy()
 - https://lore.kernel.org/linux-nvme/20250403232432.25255-1-marcelomoreira1905@gmail.com/T/#u | https://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git/commit/?id=5df496e9ef12e85dcc21488069bbf1b0285aca00
 - https://lore.kernel.org/linux-kernel-mentees/20250828145400.GH8096@frogsfrogsfrogs/T/#t


### My Advice

-   **Get involved with the community**, don't be afraid to ask questions or answer them.
    
-   **Don't worry about making huge contributions**, every single change counts.
    
-   **Don't be afraid of maintainer reviews**, some can be very direct, but always take them as a learning experience.
    
-   **Have fun!** contribute because you want to, not because it's a task on the board.

##
*Licensed under CC BY-NC-SA 4.0*
