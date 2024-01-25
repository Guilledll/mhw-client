export default defineNuxtPlugin({
  name: 'initialize',
  order: 0, // First plugin to be loaded
  async setup() {
    try {
      // Attempt to initalize the user before loading the app
      await useUser().getCurrent();
    }
    catch (error) { }
  },
});
