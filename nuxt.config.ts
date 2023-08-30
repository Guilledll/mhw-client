import { fileURLToPath, URL } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
  },

  app: {
    head: {
      htmlAttrs: { class: "h-screen" },
      bodyAttrs: { class: "h-screen" },
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
