import { fileURLToPath, URL } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { class: "h-screen" },
      bodyAttrs: { class: "h-screen" },
      title: "Mis Horas",
    },
  },

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "vuetify-nuxt-module"],

  vuetify: {
    moduleOptions: { importComposables: false },
    vuetifyOptions: { icons: false },
  },

  ssr: false,
});
