<script setup lang="ts">
const img = useImage();

const backgroundStyles = computed(() => {
  const imgUrl = img("/images/background.png");

  return {
    backgroundImage: `url('${imgUrl}')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
  };
});
</script>

<template>
  <div
    class="flex-1 flex flex-col p-10 mx-2 mb-2 rounded-lg overflow-y-auto"
    :style="backgroundStyles"
  >
    <slot />
  </div>
</template>
