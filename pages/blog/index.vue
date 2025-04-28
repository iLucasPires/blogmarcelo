<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData(route.path, () => {
  return queryCollection("blog")
    .select("title", "path", "description", "tags")
    .all();
});

const tab = ref("all");

const q = ref("");
const hasSearch = ref(false);
const searchRef = useTemplateRef("search-ref");

const handleSearch = () => {
  hasSearch.value = true;
  nextTick(() => searchRef.value?.inputRef?.focus());
};

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
  <UCard
    :ui="{
      root: 'flex-1',
      body: 'flex flex-col gap-4',
      header: 'flex items-center gap-4 justify-between ',
    }"
  >
    <template #header>
      <div class="flex gap-2">
        <UButton
          variant="outline"
          color="neutral"
          icon="i-lucide-search"
          @click="handleSearch"
        />
        <UInput
          v-model="q"
          v-if="hasSearch"
          ref="search-ref"
          @blur="hasSearch = q.length !== 0"
        />
      </div>
      <h2 class="font-bold text-xl break-all">Posts</h2>
      <USelectMenu v-model="tab" :items="tabs" class="w-48" />
    </template>

    <ul class="flex flex-col gap-4">
      <UCard
        as="li"
        class="cursor-pointer hover:ring-2"
        v-for="(post, index) in posts"
        :key="index"
        :ui="{
          body: 'space-y-2',
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
          <UBadge
            v-for="(tag, index) in post.tags"
            as="li"
            :key="index"
            :label="tag"
          />
        </ul>
      </UCard>
    </ul>
  </UCard>
</template>
