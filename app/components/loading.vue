<script setup lang="ts">
const loading = ref(true);
const displayedTexts = ref<string[]>([]);

const texts = [
  "Initializing kernel...",
  "Loading essential modules...",
  "Mounting root filesystem: /dev/sda1",
  "Checking file system integrity... OK",
  "Starting udev daemon...",
  "Detecting hardware...",
  "> CPU: Intel(R) Core(TM) i7 detected",
  "> Memory: 16 GB RAM",
  "> GPU: NVIDIA GeForce GTX 1660",
  "> Network Interface: eth0, wlan0",
  "Applying system configurations...",
  "Starting system services...",
  "> sshd        [ OK ]",
  "> cron        [ OK ]",
  "> network     [ OK ]",
  "> docker      [ OK ]",
  "> cups        [FAILED]",
  "> bluetooth   [ OK ]",
  "Setting hostname: lucas-machine",
  "Syncing system time with NTP server...",
  "[INFO] Boot process completed successfully",
  "Welcome to Meritissimo 1.0 (Kernel 6.4.12-lts)",
  "Login:",
];

onMounted(() => {
  const MAX_TIME = 1000;
  const INTERVAL_TIME = MAX_TIME / texts.length;

  setTimeout(() => {
    loading.value = false;
  }, MAX_TIME);

  let index = 0;

  const interval = setInterval(() => {
    if (index < texts.length) {
      displayedTexts.value.push(texts[index] ?? "");
      index++;
    } else {
      clearInterval(interval);
    }
  }, INTERVAL_TIME);
});
</script>

<template>
  <div class="overflow-hidden flex" v-if="loading">
    <div class="absolute inset-0 flex p-5 bg-neutral-950 z-50 text-neutral-500">
      <div class="flex-1 flex flex-col-reverse overflow-ellipsis">
        <ul class="flex flex-col flex-1">
          <li v-for="item in displayedTexts" :key="item">
            <span>[ <span class="text-success-500">OK</span> ] </span>
            <span class="text-neutral-500" v-text="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
