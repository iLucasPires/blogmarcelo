<script setup>
const slug = useRoute().params.slug;

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
</script>

<template>
  <div>
    <UCard
      :ui="{
        content: 'p-4',
        header: 'flex items-center gap-4 justify-between',
        body: 'space-y-4',
      }"
    >
      <template #header>
        <div>
          <UButton
            variant="outline"
            color="neutral"
            icon="i-lucide-chevron-left"
            @click="$router.go(-1)"
          />
        </div>

        <h2
          class="font-bold uppercase tracking-widest break-all"
          v-text="post.path"
        />

        <div></div>
      </template>
      <ContentRenderer :value="post" class="prose max-w-5xl dark:prose-invert" />
    </UCard>
  </div>
</template>
