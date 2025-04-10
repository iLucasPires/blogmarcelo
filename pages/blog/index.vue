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

const result = computed(() => {
  const search = q.value.toLowerCase();

  return data.value
    ?.filter((item) => item.title.toLowerCase().includes(search))
    .filter((item) => tab.value === "all" || item.tags?.includes(tab.value));
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <UCard
      variant="subtle"
      :ui="{
        root: 'flex items-center gap-4',
        body: 'flex items-center gap-4 sm:p-2 w-full',
      }"
    >
      <UInput
        v-model="q"
        variant="outline"
        placeholder="Search..."
        class="flex-1"
      />
      <USelectMenu v-model="tab" variant="outline" :items="tabs" class="w-32" />
    </UCard>

    <ul class="flex flex-col gap-4">
      <li v-for="(item, index) in result" :key="index">
        <NuxtLink :to="item.path">
          <UCard variant="subtle">
            <template #header>
              <h2
                v-text="item.title"
                class="font-bold text-xl uppercase tracking-widest break-all"
              />
            </template>
            <p>{{ item.description }}</p>
            <template #footer>
              <div class="flex gap-2">
                <UBadge
                  v-for="(tag, index) in item.tags"
                  :key="index"
                  :label="tag"
                  variant="subtle"
                />
              </div>
            </template>
          </UCard>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
