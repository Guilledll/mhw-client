<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  {{ $route.name }}
</template>
