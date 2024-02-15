<script lang="ts" setup>
import type { VerticalNavigationLink } from '#ui/types';

const { isDark } = useDarkMode();
const { logout, user } = useUser();

const openSidebar = ref(false);

function closeSidebar() {
  openSidebar.value = !openSidebar.value
}

const items = computed<VerticalNavigationLink[][]>(() => [
  [
    { label: 'Perfil', icon: 'i-heroicons-user-16-solid', to: '/u/me', click: closeSidebar },
    { label: 'Workspace', icon: 'i-heroicons-user-group-solid', to: '/w' },
    { label: 'Ajustes', icon: 'i-heroicons-cog-6-tooth-solid', to: '/settings', click: closeSidebar },
  ],
  [{ label: 'Tema', icon: isDark.value ? 'i-heroicons-sun-16-solid' : 'i-heroicons-moon-16-solid', click: () => (isDark.value = !isDark.value) }],
  [{ label: 'Cerrar sesión', icon: 'i-heroicons-arrow-right-start-on-rectangle-16-solid', click: logout }],
]);
</script>

<template>
  <nav class="min-w-full flex justify-center">
    <div
      class="flex justify-between items-center px-3 py-2 sm:px-6 sm:py-3 flex-1 sm:border-b sm:border-gray-100 sm:shadow-md dark:border-transparent dark:bg-gray-900"
    >
      <ULink to="/" class="flex items-center gap-2">
        <span class="text-lg font-bold">Mis Horas</span>
      </ULink>

      <UAvatar
        src="https://avatars.githubusercontent.com/u/54317276?v =4"
        alt="Avatar"
        size="md"
        class="ring-1 ring-gray-100 cursor-pointer hover:outline hover:outline-gray-200 hover:outline-offset-1 transition-opacity dark:ring-0 dark:outline-gray-600"
        @click="closeSidebar"
      />

      <USlideover v-model="openSidebar" :ui="{ background: 'dark:bg-gray-900', width: 'max-w-xs', rounded: 'rounded-l-lg' }">
        <LazyUCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1', padding: 'px-2 py-4 sm:px-2 sm:py-3' }, header: { padding: 'px-4 py-4 sm:px-5' }, ring: '' }">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <UAvatar
                  src="https://avatars.githubusercontent.com/u/54317276?v =4"
                  alt="Avatar"
                  size="sm"
                  @click="closeSidebar"
                />
                <div class="text-left space-y-1">
                  <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {{ user?.name }}
                  </p>
                </div>
              </div>
              <LazyUButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="openSidebar = false" />
            </div>
          </template>

          <LazyUVerticalNavigation :links="items" class="h-full" :ui="{ inactive: 'text-gray-600', divider: { wrapper: { base: 'py-2 px-0' } } }">
            <template #icon="{ link }">
              <UIcon :name="link.icon" class="h-5 w-5" />
            </template>
          </LazyUVerticalNavigation>
        </LazyUCard>
      </USlideover>
    </div>
  </nav>
</template>
