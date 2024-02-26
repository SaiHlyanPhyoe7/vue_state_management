<template>
<div class="container mx-auto py-10">
  <Navbar />
  <div class="p-12">
    <RouterView />
  </div>
</div>
</template>

<script setup lang="ts">
import Navbar from './views/Navbar.vue';
</script>

