<script lang="ts" setup>
import { getServerTime } from "@api/serverApi";

const time = ref();

async function getTime() {
  const { data, ok, error } = await getServerTime();

  time.value = ok ? data.time : error?.message;
}
</script>

<template>
  <button @click="getTime">kkk</button>
  {{ time }}
</template>
