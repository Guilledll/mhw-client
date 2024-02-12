import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { FetchError } from 'ofetch'
import type { AsyncDataRequestStatus } from '#app/composables/asyncData'

export default defineNuxtPlugin({
  name: 'api-fetch',
  order: 0,
  setup() {
    const config = useRuntimeConfig();

    const fetch = $fetch.create({
      baseURL: config.public.apiUrl,
      credentials: 'include',
    });

    async function api<T>(request: NitroFetchRequest, options?: NitroFetchOptions<typeof request>) {
      const data = ref<T>();
      const error = ref<FetchError<T>>();
      const status = ref<AsyncDataRequestStatus>('pending');

      try {
        // Make this statement executable every time so headers are reactive
        options = { ...options, headers: headers(options?.headers) }

        const res = await fetch<T>(request, options);

        data.value = res;
        status.value = 'success'
      }
      catch (e) {
        console.error(e);

        error.value = e.data
        status.value = 'error'
      }

      return { data, error, status }
    }

    return { provide: { api } }
  },
})
