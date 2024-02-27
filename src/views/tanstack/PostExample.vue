<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col justify-start items-center gap-12 border rounded-lg py-10 w-[30rem]">
      <div class="text-emerald-400" v-if="isSuccess">Post created successfully!</div>
      <div class="text-red-600" v-if="isError">An error occurred while creating the post: {{ error }}</div>

      <h1 class="text-3xl font-bold">Create Post</h1>
      <div class="space-x-4">
        <label for="title">Title:</label>
        <input class="border rounded-lg px-4 py-2 min-w-40" id="title" v-model="title" type="text">
      </div>
      <div class="space-x-4">
        <label for="body">Body:</label>
        <textarea class="border rounded-lg px-4 py-2 min-w-40" id="body" v-model="body"></textarea>
      </div>
      <div class="space-x-4">
        <label for="userId">User ID:</label>
        <input class="border rounded-lg px-4 py-2 min-w-40" id="userId" v-model.number="userId" type="number">
      </div>
      <button :disabled="isPending" @click="createPost" class="rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed bg-emerald-500 text-white px-4 py-2">Create Post</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';

const createPostMutation = useMutation({
  mutationFn: (newPost: any) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
  },
  onError: (error) => {
    console.error('An error occurred while creating the post:', error);
  },
  onSuccess: (data) => {
    console.log('Post created successfully:', data);
  },
});

let title = '';
let body = '';
let userId = 1; // Assuming 1 as the default user ID

const createPost = () => {
  createPostMutation.mutate({
    title,
    body,
    userId
  });
};

const { isSuccess, isError, error, isPending } = createPostMutation;
</script>
