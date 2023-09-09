import type { User } from "~/src/types/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const { data: user } = useNuxtData<User>("user");

  if (!user.value) return navigateTo({ path: "/login" });
});
