<script lang="ts" setup>
import Navbar from '~/components/nav/Navbar.vue';
</script>

<template>
  <main class="flex flex-col">
    <Navbar />

    <slot />
  </main>
</template>

<style scoped></style>
