<template>
  <div class="w-full flex">
    <select v-model="selectedResource" class="bg-indigo-400 p-4 rounded-md text-white w-1/6 h-fit">
      <option value="posts">Posts</option>
      <option value="comments">Comments</option>
      <option value="albums">Albums</option>
      <option value="photos">Photos</option>
      <option value="todos">Todos</option>
      <option value="users">Users</option>
    </select>

    <h2 class="w-1/6 text-center pt-4" v-if="data">{{ selectedResource.toUpperCase() }} LIST</h2>

    <ul v-if="data" class="w-4/6">
      <li v-for="item in data" :key="item.id" class="capitalize">{{ item.title || item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import axios from 'axios';

const selectedResource = ref('posts');
const data = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/${selectedResource.value}`);
    let fetchedData = response.data;

    if (selectedResource.value === 'photos') {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 3 seconds for photos
    }

    data.value = fetchedData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

watchEffect(() => {
  fetchData();
});

</script>
