export default defineNuxtRouteMiddleware((to) => {
  const { user } = useUser()

  if (!user.value && to.path !== 'login')
    return navigateTo({ path: '/login' });
});
