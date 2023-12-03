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
  <nav class="items-center">
    <div
      class="border border-gray-50 shadow-md rounded-lg hover:bg-black flex justify-end px-4 py-2"
    >
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-default select-text opacity-75' } }"
        :popper="{ placement: 'bottom-end' }"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/54317276?v=4"
          alt="Avatar"
          size="md"
          class="ring-1 ring-gray-100 hover:outline hover:outline-gray-200 hover:outline-offset-1 transition-opacity dark:ring-gray-800"
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
