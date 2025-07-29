<script setup lang="ts">
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const menuItems = ref([
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
]);

const colorMode = useColorMode();

const currentTime = ref("");

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

function updateTime() {
  const now = new Date();
  currentTime.value = format(now, "eeeeee dd  HH:mm", {
    locale: ptBR,
  });
}

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (_isDark) => (colorMode.preference = _isDark ? "dark" : "light"),
});
</script>

<template>
  <div class="flex justify-between items-center w-full p-1">
    <div class="flex items-center gap-2">
      <UButton
        variant="ghost"
        label="Atividades"
        color="neutral"
        to="/"
        class="font-black"
      />
      <UDropdownMenu
        :ui="{
          content: 'p-2 dark:bg-neutral-900  rounded-3xl',
          item: 'rounded-4xl p-2',
        }"
        :items="[
          { label: 'Home', to: '/', icon: 'i-lucide-house' },
          { label: 'Blog', to: '/blog', icon: 'i-lucide-file-text' },
        ]"
      >
        <UButton
          variant="ghost"
          color="neutral"
          label="Menu"
          class="font-black"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <div
      class="absolute left-1/2 transform -translate-x-1/2 font-black text-sm"
      v-text="currentTime"
    />
    <div class="flex items-center gap-2">
      <ClientOnly v-if="!colorMode?.forced">
        <UPopover
          :ui="{
            content: 'p-3 w-96 m-2 dark:bg-neutral-900 ring-0 rounded-3xl',
          }"
        >
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
                color="primary"
                variant="solid"
                class="rounded-3xl"
                :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                :label="isDark ? 'Light' : 'Dark'"
                @click="isDark = !isDark"
              />

              <!-- <UButton
                size="lg"
                class="rounded-3xl"
                color="primary"
                variant="solid"
                icon="i-lucide-languages"
                label="Português"
              /> -->
            </div>
          </template>
        </UPopover>
      </ClientOnly>
    </div>
  </div>
</template>
