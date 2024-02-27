<template>
  <div>
    <nav class="bg-gray-800 p-4 text-white">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold">Vue 3</router-link>
        <div>
          <router-link to="/" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-400 p-4">First Example</router-link>
          <router-link to="/second" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-400 p-4">Second Example</router-link>
          <router-link to="/fix-all-condition" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-400 p-4">fix-all-condition</router-link>
          <router-link to="/mock-example" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-400 p-4">mock-example</router-link>
          <router-link to="/get-tanstack-example" class="mx-2 hover:underline underline-offset-4 decoration-sky-400 duration-500 hover:text-sky-400 p-4">get-tanstack-example</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">

</script>
