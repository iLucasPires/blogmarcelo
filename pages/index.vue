<script setup lang="ts">
const socials = [
  {
    name: "GitHub",
    icon: "simple-icons:github",
    url: "https://github.com/meritissimo1",
  },
  {
    name: "Codeberg",
    icon: "simple-icons:codeberg",
    url: "https://codeberg.org/meritissimo1",
  },
  {
    name: "intra 42",
    icon: "simple-icons:42",
    url: "https://profile-v3.intra.42.fr/users/marcrodr",
  },
];
</script>

<template>
  <div class="grid grid-cols-14 grid-rows-5 grid-flow-col-dense gap-4">
    <UButton
      v-for="(social, index) in socials"
      color="neutral"
      variant="ghost"
      class="flex flex-col gap-4"
      target="_blank"
      :to="social.url"
      :key="index"
      :ui="{
        base: 'bg-neutral-950/10 hover:bg-neutral-950/40 text-white/90',
      }"
    >
      <UIcon class="" size="72" :name="social.icon" />
      <h2 class="mt-auto text-white shadow-xl">{{ social.name }}</h2>
    </UButton>
  </div>
</template>
