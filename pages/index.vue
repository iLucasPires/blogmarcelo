<script setup lang="ts">
const runtime = useRuntimeConfig();

const { data: posts } = await useAsyncData("lastBlogPosts", () => {
  return queryCollection("blog")
    .select("title", "path", "description", "tags")
    .limit(3)
    .all();
});

const { data: repos } = await useAsyncData("lastRepoPosts", () =>
  $fetch<
    {
      name: string;
      description: string;
      language: string;
      html_url: string;
      fork: boolean;
    }[]
  >("https://codeberg.org/api/v1/users/meritissimo1/repos?limit=3")
);
</script>
<template>
  <div class="flex flex-col gap-8 items-center justify-center flex-1">
    <div class="flex flex-col gap-4 w-full">
      <ULink
        to="https://codeberg.org/meritissimo1"
        class="font-bold text-xl uppercase tracking-widest break-all"
        v-text="'Últimos Projetos'"
      />
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard variant="soft"
          as="li"
          v-for="(repo, index) in repos"
          :key="index"
          :ui="{
            root: 'flex flex-col w-full cursor-pointer hover:ring-2',
            body: 'flex flex-col gap-4 w-full',
          }"
          @click="navigateTo(repo.html_url, { external: true })"
        >
          <h2
            class="font-bold uppercase tracking-widest break-all"
            v-text="repo.name"
          />
          <p
            class="text-sm text-neutral-500 text-pretty"
            v-text="repo.description"
          />
          <ul class="flex gap-2 w-full">
            <li>
              <UBadge :label="repo.language" />
            </li>
          </ul>
        </UCard>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <ULink
        to="/blog"
        class="font-bold text-xl uppercase tracking-widest break-all"
        v-text="'Últimos posts'"
      />
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
  </div>
</template>
