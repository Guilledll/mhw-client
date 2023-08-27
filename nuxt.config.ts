import { fileURLToPath, URL } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "#api": fileURLToPath(new URL("./src/api", import.meta.url)),
  },

  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss"],

  ssr: false,
});
