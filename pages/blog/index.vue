<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData(route.path, () => {
  return queryCollection("blog")
    .select("title", "path", "description", "tags")
    .all();
});

const q = ref("");
const tab = ref("all");

const tabs = computed(() => {
  if (!data.value) return [];

  return [
    ...new Set(["all", ...data.value.flatMap((post) => post.tags || [])]),
  ];
});

const posts = computed(() => {
  const search = q.value.toLowerCase();

  return data.value
    ?.filter((item) => item.title.toLowerCase().includes(search))
    .filter((item) => tab.value === "all" || item.tags?.includes(tab.value));
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <UInput v-model="q" placeholder="Search..." class="flex-1" />
      <USelectMenu v-model="tab" :items="tabs" class="w-48" />
    </div>

    <ul class="flex flex-col gap-4">
      <UCard variant="soft"
        as="li"
        v-for="(post, index) in posts"
        :key="index"
        :ui="{
          root: 'flex flex-col cursor-pointer hover:ring-2',
          body: 'flex flex-col gap-4 w-full',
        }"
        @click="navigateTo(post.path)"
      >
        <h2
          class="font-bold uppercase tracking-widest break-all"
          v-text="post.title"
        />
        <p
          class="text-sm text-neutral-500 text-pretty"
          v-text="post.description"
        />
        <ul class="flex gap-2 w-full">
          <li v-for="(tag, index) in post.tags" :key="index">
            <UBadge :label="tag" />
          </li>
        </ul>
      </UCard>
    </ul>
  </div>
</template>
