<script setup>
const slug = useRoute().params.slug;

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
</script>

<template>
  <UCard
    :ui="{
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

    <div>
      <h1 class="text-2xl font-bold uppercase tracking-widest break-all" v-text="post.title" />
      <p class="text-sm text-neutral-500 text-pretty" v-text="post.description" />
      
    </div>

    <ContentRenderer :value="post" class="prose dark:prose-invert" />
  </UCard>
</template>
