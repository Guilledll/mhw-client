import { getUser } from "~/src/api/userApi";

export default defineNuxtPlugin({
  name: "initialize",
  order: 0,
  async setup() {
    try {
      // Attempt to initalize the user before loading the app
      await useAsyncData("user", () => getUser(), {
        transform: ({ ok, data }) => {
          return ok ? data : null;
        },
      });
    } catch (error) {}
  },
});
