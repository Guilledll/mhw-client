<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({ middleware: 'guest' });

const config = useRuntimeConfig();
const API_URL = config.public.apiUrl;

const state = reactive({ email: undefined, password: undefined });
const form = ref();

const { loading, startLoad, stopLoad } = useLoading();

const schema = z.object({
  email: z
    .string({ required_error: 'Correo requerido' })
    .email('Correo incorrecto'),
  password: z.string({ required_error: 'Contraseña requerida' }),
});
type Schema = z.output<typeof schema>;

async function submit(event: FormSubmitEvent<Schema>) {
  form.value.clear();
  startLoad();

  await useFetch(`${API_URL}/sanctum/csrf-cookie`, { credentials: 'include' });

  const { status, error } = await useFetch(`${API_URL}/login`, {
    credentials: 'include',
    method: 'POST',
    headers: headers(),
    body: event.data,
    // `watch: false` to avoid refetch on form input change after first api fetch
    watch: false,
  });

  if (status.value === 'error') {
    form.value.setErrors(parseApiErrors(error));

    return stopLoad();
  }

  await useFetch('/api/user', { key: 'user' });
  return navigateTo('/', { replace: true });
}
</script>

<template>
  <UContainer class="h-screen flex max-w-xl items-center">
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="w-full space-y-4"
      @submit="submit"
    >
      <UFormGroup label="Email" size="md" name="email">
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          type="email"
          autocomplete="username"
          required
        />
      </UFormGroup>

      <UFormGroup label="Contraseña" size="md" name="password">
        <UInput
          v-model.lazy="state.password"
          type="password"
          icon="i-heroicons-key"
          autocomplete="current-password"
          required
        />
      </UFormGroup>

      <UButton type="submit" variant="soft" size="md" :loading="loading" block>
        Ingresar
      </UButton>
    </UForm>
  </UContainer>
</template>
