<script setup lang="ts">
const menuItems = ref([
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
]);

const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (_isDark) => (colorMode.preference = _isDark ? "dark" : "light"),
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <UCard variant="soft"
      :ui="{
        root: 'w-full h-full',
        body: 'sm:p-0 sm:px-4 flex items-center justify-between',
      }"
    >
      <UButton variant="ghost" color="neutral" icon="fa6-solid:frog" to="/" />

      <UNavigationMenu
        class="hidden lg:flex"
        variant="link"
        :items="menuItems"
      />
      <div class="flex items-center gap-2">
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>
      </div>

      <UDrawer class="lg:hidden" placement="left">
        <UButton
          label="Open"
          color="neutral"
          variant="ghost"
          icon="lucide:menu"
        />

        <template #body>
          <UNavigationMenu
            orientation="vertical"
            variant="link"
            :items="menuItems"
          />
        </template>
      </UDrawer>
    </UCard>
  </div>
</template>
