// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { class: "h-screen", lang: "es" },
      bodyAttrs: { class: "h-screen" },
      title: "Mis Horas",
    },
  },

  components: false,

  devtools: { enabled: true },

  devServer: { host: "localhost" },

  modules: ["@nuxtjs/tailwindcss"],

  routeRules: {
    "/api/**": { proxy: { to: "http://localhost/api/**" } },
  },

  runtimeConfig: {
    public: {
      appUrl: "http://localhost:3000",
      apiUrl: "http://localhost",
    },
  },

  ssr: true,
});
