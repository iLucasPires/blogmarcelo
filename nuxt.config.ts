// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      codebergKey: process.env.CODEBERG_KEY,
      githubKey: process.env.GITHUB_KEY,
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
});
