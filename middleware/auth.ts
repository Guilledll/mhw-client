export default defineNuxtRouteMiddleware((to) => {
  const { data: user } = useNuxtData('user');

  if (!user.value && to.path !== 'login')
    return navigateTo({ path: '/login' });
});
