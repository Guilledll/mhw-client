export default defineNuxtRouteMiddleware((to, from) => {
  const { data: user } = useNuxtData("user");

  if (!!user.value && to.path !== "/") return navigateTo({ path: "/" });
});
