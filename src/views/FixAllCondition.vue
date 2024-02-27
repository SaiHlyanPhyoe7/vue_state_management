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

    <!-- Error UI -->
    <div v-if="responseError" class="text-red-500">{{ responseError }}</div>

    <!-- Loading UI -->
    <div v-if="loading" class="text-emerald-500 text-center p-4">Loading .......</div>

    <ul v-if="data && !responseError" class="w-4/6">
      <li v-for="item in data" :key="item.id" class="capitalize">
        {{ getItemTitle(item) }}
      </li>
    </ul>

    <!-- Empty state UI -->
    <div v-if="empty && !responseError" class="text-gray-500">No {{ selectedResource.toUpperCase() }} found</div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch, watchEffect } from 'vue';
import axios from 'axios';

import { ResourceData } from '../types/index';
import {getItemTitle} from '../utils/index';

import { AxiosError } from 'axios';

const selectedResource = ref('posts');
const responseError = ref<string | null>(null);

// 1. Fix the Race Condition Bugs
// 2. Loading State 
// 3. Empty State
// 4. Data & Error are not reset when category changes

const data = ref<ResourceData | undefined>(undefined);
let ignore = false; // To ignore subsequent fetch requests while one is ongoing

const loading = ref(false); // Loading state variable
// After added loading not too bad but again with the ignore gets a little bit more complex

let abortController: AbortController | null = null; // AbortController for cancelling requests

const empty = ref(false); // Empty state variable
// Initializing data with an empty array seems like a good idea 
// to avoid having to check for undefined all the time
// But what if we fetch data for a category that has no entries yet, and we actually get back an empty array?
// We'd have no way to distinguish between "no data yet" and "no data at all". So we can't show NO Data avaliable UI
// The loading state we've just introduced helps, but it's still better to initialize with undefined:

// Both data and error are separate state variables, and they don't get reset when category changes
// So both data and error can be exist at the same time if you are not wiping them out
// So we should be wiping out the error when we change the category
//  That means if one category fails, and we switch to another one that is fetched successfully, our state will be
// data: dataFromCurrentCategory
// error: errorFromPreviousCategory
// The result will then depend on how we actually render JSX based on this state. 
// If we check for error first, we'll render the error UI with the old message even though we have valid data

const fetchData = async () => {
  try {
    if (ignore) return; // If a fetch request is already in progress, ignore subsequent calls

    // Cancel the previous request if it exists
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController(); // Create a new AbortController for the current request
    const signal = abortController.signal;

    ignore = true; // Set ignore flag to true to prevent concurrent fetch requests
    loading.value = true; // Set loading state to true
    const response = await axios.get(`https://jsonplaceholder.typicode.com/${selectedResource.value}`, {
      signal // Pass the signal to the request
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch data'); // Throw an error if status is not 200 (OK)
    }

    let fetchedData: ResourceData = response.data;

    data.value = fetchedData;
    responseError.value = null; // Reset the error message

    // Check if fetched data is empty
    empty.value = fetchedData.length === 0;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.error('Axios error:', axiosError);
      responseError.value = axiosError.message; // Set the error message from Axios error
    } else {
      console.error('Error fetching data:', error);
      responseError.value = error.toString(); // Set the error message
    }
    data.value = undefined; // Reset data to undefined
  } finally {
    ignore = false; // Reset the ignore flag after fetch request completes
    loading.value = false; // Reset loading state after fetch request completes
  }
};

watchEffect(() => {
  fetchData();
});

// Clean up the ongoing request when the component is unmounted
onUnmounted(() => {
  if (abortController) {
    abortController.abort();
  }
});

// Watch for changes in selectedResource and trigger fetchData accordingly
// watch(selectedResource, async (newValue, oldValue) => {
//   fetchData();
// });

</script>
