<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({ middleware: 'guest', layout: 'auth' });

const { login, getCsrfToken, getCurrent } = useUser();
const { loading, startLoad, stopLoad } = useLoading();

const state = reactive({ email: undefined, password: undefined });
const form = ref();

const schema = z.object({
  email: z.string({ required_error: 'Correo requerido' }).email('Correo incorrecto'),
  password: z.string({ required_error: 'Contraseña requerida' }),
});
type Schema = z.output<typeof schema>;

async function submit(event: FormSubmitEvent<Schema>) {
  form.value.clear();
  startLoad();

  await getCsrfToken();

  const { status, error } = await login(event.data);

  if (status.value === 'error') {
    form.value.setErrors(parseApiErrors(error));

    return stopLoad();
  }

  await getCurrent();
  return navigateTo('/', { replace: true });
}
</script>

<template>
  <UContainer class="flex max-w-xl items-center h-full">
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="w-full space-y-4"
      @submit="submit"
    >
      <UFormGroup label="Email" size="lg" name="email">
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          type="email"
          autocomplete="username"
          required
        />
      </UFormGroup>

      <UFormGroup label="Contraseña" size="lg" name="password">
        <UInput
          v-model.lazy="state.password"
          type="password"
          icon="i-heroicons-key"
          autocomplete="current-password"
          required
        />
      </UFormGroup>

      <UButton type="submit" variant="soft" size="lg" :loading="loading" block>
        Ingresar
      </UButton>
    </UForm>
  </UContainer>
</template>
