<script lang="ts" setup>
import Button from "@/components/btn/Button.vue";
import Input from "@/components/form/Input.vue";

definePageMeta({ middleware: "guest" });

const { loading, toggleLoad } = useLoading();
const config = useRuntimeConfig();
const API_URL = config.public.apiUrl;

interface formType {
  [key: string]: string;
  email: string;
  password: string;
}

const form = reactive<formType>({
  email: "guille@mhw.com",
  password: "password",
});

const formErrors = reactive<formType>({
  email: "",
  password: "",
});

async function submit() {
  toggleLoad();

  // await getCsrfCookie();

  await useFetch(API_URL + "/sanctum/csrf-cookie", { credentials: "include" });
  const { status } = await useFetch(API_URL + "/login", {
    credentials: "include",
    method: "POST",
    headers: headers(),
    body: form,
  });
  // const { ok, error } = await login(form);

  if (status.value === "error") {
    // handleErrors(error);
    return toggleLoad();
  }

  if (status.value === "success") {
    const { status } = await useFetch("/api/user", {
      key: "user",
      // transform: (r) => r.data,
    });
    toggleLoad();
    if (status.value === "success") return navigateTo("/", { replace: true });
  }
}
</script>

<template>
  <main class="flex h-full flex-1 flex-col justify-center items-center">
    <form
      @submit.prevent="submit"
      class="max-w-4xl px-6 py-10 rounded-md flex flex-col gap-3"
    >
      <Input
        v-model="form.email"
        autocomplete="email"
        id="email"
        type="email"
        placeholder="correo@mail.com"
        label="Correo"
        :error="formErrors.email"
        required
      />
      <Input
        v-model="form.password"
        id="password"
        autocomplete="current-password"
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
