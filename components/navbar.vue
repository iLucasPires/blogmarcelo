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
  <div class="flex justify-between items-center w-full p-1">
    <div class="flex items-center gap-2">
      <UButton variant="ghost" label="Atividades" color="neutral" to="/" />
      <UDropdownMenu
        :items="[
          { label: 'Home', to: '/', icon: 'i-lucide-house' },
          { label: 'Blog', to: '/blog', icon: 'i-lucide-file-text' },
        ]"
      >
        <UButton
          variant="ghost"
          color="neutral"
          label="Menu"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>

    <div class="flex items-center gap-2">
      <ClientOnly v-if="!colorMode?.forced">
        <UPopover :ui="{ content: 'p-2 w-96 mt-2' }">
          <UButton
            label="Open"
            color="neutral"
            variant="ghost"
            class="flex items-center gap-2"
          >
            <UIcon size="16" name="i-lucide-sun-moon" />
            <UIcon size="16" name="i-lucide-earth" />
          </UButton>
          <template #content>
            <div class="grid gap-2 grid-cols-2">
              <UButton
                size="lg"
                block
                color="primary"
                variant="solid"
                :trailing-icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                :label="isDark ? 'Light' : 'Dark'"
                @click="isDark = !isDark"
              />

              <UButton
                size="lg"
                block
                color="primary"
                variant="solid"
                trailing-icon="i-lucide-languages"
                label="Português"
              />
            </div>
          </template>
        </UPopover>
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
  </div>
</template>
