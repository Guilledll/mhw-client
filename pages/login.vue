<script lang="ts" setup>
import { login, getCsrfCookie } from "~/src/api/authApi";
import { getUser } from "~/src/api/userApi";

import Button from "@/components/btn/Button.vue";
import Input from "@/components/form/Input.vue";
import { ErrorResponse } from "~/src/api/api";

definePageMeta({ middleware: "guest" });

const { loading, invertLoad } = useLoading();

interface formType {
  [key: string]: string;
  email: string;
  password: string;
}

const form = reactive<formType>({
  email: "guille@mhw.comxx",
  password: "password_1",
});

const formErrors = reactive<formType>({
  email: "",
  password: "",
});

async function submit() {
  invertLoad();

  await getCsrfCookie();
  const { ok, error } = await login(form);

  if (!ok && error) {
    handleErrors(error);
    return invertLoad();
  }

  if (ok) {
    const { status } = await useAsyncData("user", () => getUser(), {
      transform: (r) => r.data,
    });
    invertLoad();
    if (status.value === "success") return navigateTo("/", { replace: true });
  }
}

function handleErrors(e: ErrorResponse<formType>) {
  for (const key in e.errors) {
    formErrors[key] = e.errors[key][0];
  }
}
</script>

<template>
  <main class="flex h-full flex-1 flex-col justify-center items-center">
    <form
      @submit.prevent="submit"
      class="max-w-4xl px-6 py-10 rounded-md flex flex-col gap-3"
    >
      <!-- autocomplete="email" -->
      <Input
        v-model="form.email"
        id="email"
        type="email"
        placeholder="correo@mail.com"
        label="Correo"
        :error="formErrors.email"
        required
      />
      <!-- autocomplete="current-password" -->
      <Input
        v-model="form.password"
        id="password"
        placeholder="********"
        type="password"
        label="Contraseña"
        :error="formErrors.password"
        required
      />
      <Button type="submit" :loading="loading">Ingresar</Button>
    </form>
  </main>
</template>
