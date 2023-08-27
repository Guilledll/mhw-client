<script lang="ts" setup>
import { login, getCsrfCookie } from "#api/auth";

const form = reactive({
  email: "",
  password: "",
});

async function submit() {
  getCsrfCookie().then(async () => {
    const res = await login(form);

    console.log(res);
  });
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="email">Correo Electronico</label>
      <input
        v-model="form.email"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="Correo"
      />
    </div>
    <div>
      <label for="email">Contraseña</label>
      <input
        v-model="form.password"
        type="password"
        name="password"
        placeholder="Contraseña"
      />
      <!-- autocomplete="current-password" -->
    </div>
    <button type="submit">Ingresar</button>
  </form>
</template>
