<script lang="ts" setup>
import type { User } from '~/src/types/models/user';

const { data: user } = useNuxtData<User>('user');
const config = useRuntimeConfig();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const items = computed(() => [
  [{ label: 'Mis Horas Web', slot: 'account', disabled: true }],
  [
    {
      label: `Modo ${isDark.value ? 'claro' : 'oscuro'}`,
      icon: isDark.value ? 'i-heroicons-sun' : 'i-heroicons-moon',
      click: () => (isDark.value = !isDark.value),
    },
    {
      label: 'Ajustes',
      icon: 'i-heroicons-cog-8-tooth',
      to: '/settings',
      disabled: true,
    },
  ],
  [
    {
      label: 'Cerrar sesión',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: logoutUser,
    },
  ],
]);

async function logoutUser() {
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
</script>

<template>
  <nav class="min-w-full flex justify-center">
    <div
      class="border border-gray-50 shadow-md rounded-lg flex justify-between items-center px-4 py-2 max-w-5xl flex-1 dark:border-transparent dark:bg-gray-800"
    >
      <ULink to="/" class="flex items-center gap-2">
        <UIcon name="i-heroicons-bars-3-center-left" class="h-5 w-5" />
        <span class="text-lg font-bold"> Mis Horas </span>
      </ULink>

      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-default select-text opacity-75' } }"
        :popper="{ placement: 'bottom-end', offsetDistance: 20, arrow: true }"
        class=""
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/54317276?v =4"
          alt="Avatar"
          size="md"
          class="ring-1 ring-gray-100 hover:outline hover:outline-gray-200 hover:outline-offset-1 transition-opacity dark:ring-0 dark:outline-gray-600"
        />

        <template #account="{ item }">
          <div class="text-left space-y-1">
            <p
              class="truncate text-base font-medium text-gray-900 dark:text-white"
            >
              {{ item.label }}
            </p>
            <p class="text-sm">
              {{ user?.email }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate font-normal text-gray-700 dark:text-white">
            {{ item.label }}</span>
          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-600 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </div>
  </nav>
</template>
