export default defineNuxtRouteMiddleware((to, from) => {
  const { data: user } = useNuxtData("user");

  if (!user.value) return navigateTo({ path: "/login" });
});