import type { User } from '~/src/types/models/user';

export default function () {
  const { $api } = useNuxtApp();

  const user = useState<User>('user', () => null);

  /**
   * Get current logged in user
   */
  async function getCurrent() {
    const { data } = await $api<User>('/api/user');

    user.value = data.value;

    return data.value;
  }

  /**
   * Retrive CSRF-TOKEN for user authentication
   */
  async function getCsrfToken() {
    return $api(`/sanctum/csrf-cookie`);
  }

  /**
   * Attempt to log in the user
   */
  async function login(body) {
    return $api(`/login`, { method: 'POST', body });
  }

  /**
   * End session and redirect to login
   */
  async function logout() {
    const { status } = await $api('/logout', { method: 'POST' });

    if (status.value === 'success') {
      user.value = null;
      await navigateTo('/login', { replace: true });
    }
  }

  return {
    user,
    getCurrent,
    getCsrfToken,
    login,
    logout,
  }
}
