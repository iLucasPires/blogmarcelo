<script setup lang="ts">
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
</script>

<template>
  <div class="w-full bg-neutral-950 z-10">
    <div class="flex justify-between items-center w-full h-8 px-5">
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
    </div>
  </div>
</template>
