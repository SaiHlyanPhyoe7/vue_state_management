<template>
  <div class="w-full flex">
    <select v-model="selectedResource" @change="invalidateTodoQueries" class="bg-indigo-400 cursor-pointer p-4 rounded-md text-white w-1/6 h-fit">
      <option value="posts">Posts</option>
      <option value="comments">Comments</option>
      <option value="albums">Albums</option>
      <option value="photos">Photos</option>
      <option value="todos">Todos</option>
      <option value="users">Users</option>
    </select>

    <h2 class="w-1/6 text-center pt-4" v-if="isSuccess">{{ selectedResource.toUpperCase() }} LIST</h2>

    <!-- Error UI -->
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <!-- Loading UI -->
    <div v-if="isLoading" class="text-emerald-500 text-center p-4">Loading .......</div>

    <ul v-if="isSuccess && !isEmpty" class="w-4/6">
      <li v-for="item in data" :key="item.id" class="capitalize">
        {{ getItemTitle(item) }}
      </li>
    </ul>

    <!-- Empty state UI -->
    <div v-if="isSuccess && isEmpty" class="text-gray-500">No {{ selectedResource.toUpperCase() }} found</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { ResourceData } from '../../types/index';
import {getItemTitle} from '../../utils/index';

const selectedResource = ref('posts');

const fetchTodoList = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${selectedResource.value}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const { data, error, isLoading, isSuccess } = useQuery<ResourceData>({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
});

const isEmpty = computed(() => data.value!==undefined && data.value.length === 0);

const queryClient = useQueryClient();

const invalidateTodoQueries = () => {
  queryClient.invalidateQueries({ queryKey: ['todos'] });
};

watch(selectedResource, () => {
  invalidateTodoQueries();
});

onUnmounted(() => {
  // Cleanup code if needed
});
</script>
