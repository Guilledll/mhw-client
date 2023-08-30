<script lang="ts" setup>
import { login, getCsrfCookie } from "@api/authApi";

const form = reactive({
  email: "",
  password: "",
});

async function submit() {
  getCsrfCookie().then(async () => {
    const { ok } = await login(form);

    if (ok) return navigateTo("/");
  });
}
</script>

<template>
  <main class="flex min-h-full flex-1 flex-col justify-center items-center">
    <VForm
      @submit.prevent="submit"
      class="max-w-3xl p-6 border border-red-100 rounded"
    >
      <VTextField
        v-model="form.email"
        label="Correo"
        placeholder="mi-mail@email.com"
        type="email"
        autocomplete="email"
        variant="solo"
      />
      <VTextField
        v-model="form.password"
        label="Contraseña"
        placeholder="********"
        type="password"
        autocomplete="current-password"
        variant="solo"
      />
      <VBtn color="primary" variant="tonal" type="submit">Ingresar</VBtn>
    </VForm>
  </main>
</template>
