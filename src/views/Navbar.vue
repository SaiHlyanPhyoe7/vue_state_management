<template>
  <div>
    <nav class="bg-gray-800 p-4 text-white">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold">Vue 3</router-link>
        <div>
          <router-link to="/" :class="{ 'duration-300 bg-sky-400 underline-offset-4 scale-150': isCurrentPath('/') }" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-100 p-4">First Example</router-link>
          <router-link to="/second" :class="{ 'duration-300 bg-sky-400 underline-offset-4 scale-150': isCurrentPath('/second') }" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-100 p-4">Second Example</router-link>
          <router-link to="/mock-example" :class="{ 'duration-300 bg-sky-400 underline-offset-4 scale-150': isCurrentPath('/mock-example') }" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-100 p-4">mock-example</router-link>
          <router-link to="/fix-all-condition" :class="{ 'duration-300 bg-sky-400 underline-offset-4 scale-150': isCurrentPath('/fix-all-condition') }" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-100 p-4">fix-all-condition</router-link>
          <router-link to="/get-tanstack-example" :class="{ 'duration-300 bg-sky-400 underline-offset-4 scale-150': isCurrentPath('/get-tanstack-example') }" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-100 p-4">get-tanstack-example</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const isCurrentPath = (path: string): boolean => {
  return route.path === path;
};

</script>
