<script setup lang="ts">
const socials = ref([
  {
    label: "intra 42",
    icon: "simple-icons:42",
    to: "https://profile-v3.intra.42.fr/users/marcrodr",
  },
  {
    label: "GitHub",
    icon: "simple-icons:github",
    to: "https://github.com/meritissimo1",
  },
  {
    label: "Codeberg",
    icon: "simple-icons:codeberg",
    to: "https://codeberg.org/meritissimo1",
  },
  {
    label: "linux foundation",
    icon: "simple-icons:linuxfoundation",
    to: "https://mentorship.lfx.linuxfoundation.org/mentee/ad455e76-362d-481f-a5ed-f1c570f77ab6",
  },
]);
</script>

<template>
  <div class="grid grid-cols-14 grid-rows-5 grid-flow-col-dense gap-4">
    <UButton
      v-for="(social, index) in socials"
      color="neutral"
      variant="ghost"
      class="flex flex-col"
      target="_blank"
      :to="social.to"
      :key="index"
      :icon="social.icon"
      :label="social.label"
      :ui="{
        leadingIcon: 'size-12',
        base: ' hover:bg-neutral-950/40 text-white/90 active:bg-neutral-950/50',
      }"
    />
  </div>
</template>
