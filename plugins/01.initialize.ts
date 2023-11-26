export default defineNuxtPlugin({
  name: "initialize",
  order: 0, // First plugin to be loaded
  async setup() {
    try {
      // Attempt to initalize the user before loading the app
      await useFetch("/api/user", {
        key: "user",
        headers: headers(),
        getCachedData,
      });
    } catch (error) {}
  },
});
