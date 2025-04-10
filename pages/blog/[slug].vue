<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
</script>

<template>
  <UCard variant="subtle" class="flex flex-col gap-20">
    <div class="flex flex-col gap-2">
      <h2
        class="font-bold text-3xl uppercase tracking-widest break-all"
        v-text="post.title"
      />
      <p class="text-sm" v-text="post.description" />
    </div>

    <ContentRenderer :value="post" class="prose prose-invert" />
  </UCard>
</template>
