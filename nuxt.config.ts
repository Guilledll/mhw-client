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

  modules: ["@nuxtjs/tailwindcss"],

  ssr: false,
});
