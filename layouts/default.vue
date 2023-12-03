<script lang="ts" setup>
import Navbar from '~/components/nav/Navbar.vue';
</script>

<template>
  <main class="p-2 flex flex-col gap-2">
    <Navbar />

    <slot />
  </main>
</template>

<style scoped></style>
