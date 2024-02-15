<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps({ error: Object as () => NuxtError })

const handleError = async () => await clearError({ redirect: '/' })
</script>

<template>
  <div class="h-screen w-screen flex items-center">
    <div class="container flex flex-col items-center justify-center px-5 text-gray-700 dark:text-gray-100 md:flex-row">
      <div class="max-w-md">
        <div class="text-5xl font-bold">
          Upsss... <strong>404</strong>
        </div>

        <br>
        <br>

        <p class="text-2xl md:text-3xl font-light leading-normal">
          <strong>Nada por aquí</strong>
        </p>

        <br>
        <br>

        <p class="mb-8">
          Comprueba que el termino de busqueda sea correcto.
        </p>

        <UButton size="md" variant="solid" color="primary" @click="handleError">
          Volver al inicio
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="h-4 w-4" />
          </template>
        </UButton>
      </div>
    </div>
  </div>
</template>
