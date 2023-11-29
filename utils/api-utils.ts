type Head = RequestInit['headers'];

/**
 * Object with needed headers to communicate with the Backend.
 *
 * @param heads - Optional extra headers to send on the Request
 */
export function headers(heads: Head = {}): Head {
  const config = useRuntimeConfig();

  return {
    'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Referer': config.public.appUrl,
    ...heads,
  };
}

/**
 * Retrieve `Nuxt` cached data if available to avoid API re-fetching.
 *
 * This function is applied on `useFetch` / `useAsyncData` with options:
 *
 * ```
 * // Auto import of `getCachedData` with `key` binding
 * await useFetch('/api/user', { key: 'user', getCachedData });
 * await useAsyncData('user', () => $fetch('/api/user'), { getCachedData });
 * ```
 *
 * @param key - Nuxt payload unique key
 */
export function getCachedData(key: string) {
  const nuxt = useNuxtApp();
  /**
   * @link https://github.com/nuxt/nuxt/pull/20747/files#diff-6b54d0385d537fe28bf4bca3e034a7de05f5a2fef365d3c1052a119df884313bR140
   */
  return nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
}
