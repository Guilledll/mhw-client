<script lang="ts" setup>
import type { FormError } from "#ui/types";

definePageMeta({ middleware: "guest", layout: "default" });

const config = useRuntimeConfig();
const API_URL = config.public.apiUrl;

const form = reactive({ email: undefined, password: undefined });

// TODO: improve form validation
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function submit() {
  await useFetch(API_URL + "/sanctum/csrf-cookie", { credentials: "include" });
  const { status } = await useFetch(API_URL + "/login", {
    credentials: "include",
    method: "POST",
    headers: headers(),
    body: form,
  });
  if (status.value === "success") {
    await useFetch("/api/user", { key: "user" });
    return navigateTo("/", { replace: true });
  }
}
</script>

<template>
  <UContainer class="h-screen flex max-w-xl items-center">
    <UForm
      :validate="validate"
      :state="form"
      class="w-full space-y-4"
      @submit="submit"
    >
      <UFormGroup label="Email" size="lg" name="email">
        <UInput v-model="form.email" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UFormGroup label="Contraseña" size="lg" name="password">
        <UInput
          v-model="form.password"
          type="password"
          icon="i-heroicons-key"
        />
      </UFormGroup>

      <UButton type="submit" variant="soft" size="lg" block>Ingresar</UButton>
    </UForm>
  </UContainer>
</template>
