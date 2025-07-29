<script setup lang="ts">
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";



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
  <div class="flex justify-between items-center w-full px-4 h-8">
    <div class="flex items-center gap-2">
      <UButton
        variant="ghost"
        color="neutral"
        to="/"
        class="p-0 h-2 rounded-3xl w-12 bg-neutral-300"
      />
    </div>
    <div
      class="absolute left-1/2 transform -translate-x-1/2 font-black text-sm"
      v-text="currentTime"
    />
    <!-- <div class="flex items-center gap-2">
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
            </div>
          </template>
        </UPopover>
      </ClientOnly>
    </div> -->
  </div>
</template>
