export default defineNuxtPlugin({
  name: 'initialize',
  order: 1, // Initialized after api is injected
  async setup() {
    try {
      const { getCurrent } = useUser();
      // Attempt to initalize the user before loading the app
      await useAsyncData('user', () => getCurrent().then(r => r || false));
    }
    catch (error) { }
  },
});
