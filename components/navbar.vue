<script setup lang="ts">
const menuItems = ref([
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
]);
</script>

<template>
  <div class="flex justify-between items-center w-full h-full">
    <UCard
      variant="subtle"
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
