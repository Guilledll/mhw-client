<script lang="ts" setup>
import type { User } from "~/src/types/models/user";

definePageMeta({ middleware: "guest" });

const time = ref();
const config = useRuntimeConfig();

async function getTime() {
  const { data } = await useFetch("/api/server-time");
  time.value = data.value;
}

const { data: user } = useNuxtData<User>("user");

async function logoutUser() {
  const { status } = await useFetch(config.public.apiUrl + "/logout", {
    method: "POST",
    key: "user",
    credentials: "include",
    headers: headers(),
    transform: () => null,
  });

  if (status.value === "success") {
    return navigateTo("/login", { replace: true });
  }
}
</script>

<template>
  <hr />
  <button @click="getTime">kkk</button>
  {{ time }}
  <hr />
  <button @click="logoutUser">Cerrar sesion</button>
  <hr />
  {{ user }}
  <NuxtLink to="login" no-prefetch>login</NuxtLink>
</template>
