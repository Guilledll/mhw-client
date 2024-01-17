// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { class: 'h-screen', lang: 'es' },
      bodyAttrs: { class: 'h-screen' },
      title: 'Mis Horas',
    },
  },

  components: false,

  colorMode: { preference: 'system' },

  devtools: { enabled: true, timeline: { enabled: true } },

  devServer: { host: 'localhost' },

  modules: [['@nuxt/ui', { icons: ['heroicons'] }]],

  runtimeConfig: {
    proxyUrl: 'http://localhost/api',
    public: {
      appUrl: 'http://localhost:3000',
      apiUrl: 'http://localhost',
    },
  },
});
