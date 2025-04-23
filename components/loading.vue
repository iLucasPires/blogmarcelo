<script setup lang="ts">
const loading = ref(true);
const displayedTexts = ref<string[]>([]);

const texts = [
  "Loading...",
  "Please wait...",
  "Almost there...",
  "Just a moment...",
  "Hang tight...",
  "Loading your content...",
  "Loading...",
  "Loading...",
  "Please wait...",
  "Almost there...",
  "Just a moment...",
  "Hang tight...",
  "Loading your content...",
  "Loading...",
  "Loading...",
  "Please wait...",
  "Almost there...",
  "Just a moment...",
  "Hang tight...",
  "Loading your content...",
  "Loading...",
  "Loading your content...",
  "Loading...",
  "Loading...",
  "Please wait...",
  "Almost there...",
  "Just a moment...",
];

onMounted(() => {
  const MAX_TIME = 1500;
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
