<script lang="ts" setup>
import { getServerTime } from "~/src/api/serverApi";
import { logout } from "~/src/api/authApi";

definePageMeta({ middleware: "auth" });

const time = ref();

async function getTime() {
  const { data, ok, error } = await getServerTime();

  time.value = ok ? data.time : error?.message;
}

const { data: user } = useNuxtData("user");

async function logoutUser() {
  const { status } = await useAsyncData("user", () => logout(), {
    transform: () => null,
  });

  if (status.value === "success") {
    return navigateTo("/login");
  }
}
</script>

<template>
  <button @click="getTime">kkk</button>
  {{ time }}
  <hr />
  <button @click="logoutUser">Cerrar sesion</button>
  <hr />
  {{ user }}
</template>
