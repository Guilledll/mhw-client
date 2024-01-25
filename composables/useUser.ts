import type { User } from '~/src/types/models/user';

export default function () {
  const config = useRuntimeConfig();

  const user = useState<User>('user');

  /**
   * Get current logged in user
   */
  async function getCurrent() {
    const { data } = await useFetch('/api/user', {
      key: 'user',
      headers: headers(),
      getCachedData,
    });

    user.value = data.value;
  }

  /**
   * End session and redirect to login
   */
  async function logout() {
    const { status } = await useFetch(`${config.public.apiUrl}/logout`, {
      method: 'POST',
      key: 'user',
      credentials: 'include',
      headers: headers(),
      transform: () => null, // Nullish the user on nuxt state
    });

    if (status.value === 'success')
      return navigateTo('/login', { replace: true });
  }

  return {
    user,
    getCurrent,
    logout,
  }
}
