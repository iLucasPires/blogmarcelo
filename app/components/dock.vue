<script setup lang="ts">
const menuItems = ref([
  { label: "home", to: "/", icon: "i-lucide-grip" },
  { label: "Blog", to: "/blog", icon: "i-lucide-notebook-text" },
]);

const socialItems = ref([
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
    label: "intra 42",
    icon: "simple-icons:42",
    to: "https://profile-v3.intra.42.fr/users/marcrodr",
  },
]);
</script>
<template>
  <UCard
    :ui="{
      body: 'sm:p-2 flex items-center gap-2',
      root: 'absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-neutral-950/70',
    }"
  >
    <ul class="flex items-center gap-2">
      <li v-for="(item, index) in menuItems">
        <UTooltip :text="item.label">
          <UButton
            color="neutral"
            variant="ghost"
            :icon="item.icon"
            :to="item.to"
            :key="index"
            :ui="{
              leadingIcon: 'size-8',
              base: 'bg-neutral-950/10 hover:bg-neutral-950/40 text-white/90',
            }"
          />
        </UTooltip>
      </li>
    </ul>

    <ul class="flex items-center gap-2">
      <li v-for="(item, index) in socialItems">
        <UTooltip :text="item.label">
          <UButton
            color="neutral"
            variant="ghost"
            target="_blank"
            :icon="item.icon"
            :to="item.to"
            :key="index"
            :ui="{
              leadingIcon: 'size-8',
              base: 'bg-neutral-950/10 hover:bg-neutral-950/40 text-white/90',
            }"
          />
        </UTooltip>
      </li>
    </ul>
  </UCard>
</template>
