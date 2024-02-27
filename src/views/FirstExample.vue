<template>
  <div class="w-full flex">
    <select v-model="selectedResource" class="bg-indigo-400 cursor-pointer p-4 rounded-md text-white w-1/6 h-fit">
      <option value="posts">Posts</option>
      <option value="comments">Comments</option>
      <option value="albums">Albums</option>
      <option value="photos">Photos</option>
      <option value="todos">Todos</option>
      <option value="users">Users</option>
    </select>

    <h2 class="w-1/6 text-center pt-4">{{ selectedResource.toUpperCase() }} LIST</h2>

    <ul v-if="data" class="w-4/6">
      <li v-for="item in data" :key="item.id" class="capitalize">
        {{ getItemTitle(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import axios from 'axios';

import { ResourceData } from '../types/index';
import {getItemTitle} from '../utils/index';

const selectedResource = ref('posts');
const data = ref<ResourceData>([]);
const responseError = ref<string | null>(null);

// Standard fetch data function with watchEffect

const fetchData = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/${selectedResource.value}`);
    let fetchedData: ResourceData = response.data;

    data.value = fetchedData;
  } catch (error:any) {
    console.error('Error fetching data:', error);
    responseError.value = error.toString(); // Set the error message
  }
};

watchEffect(() => {
  fetchData();
});

// Watch for changes in selectedResource and trigger fetchData accordingly
// watch(selectedResource, async (newValue, oldValue) => {
//   fetchData();
// });

</script>
