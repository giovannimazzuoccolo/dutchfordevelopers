<template>
  <div
    class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 p-4 flex flex-col dark:bg-slate-800"
  >
    <h3 class="text-xl text-main-orange my-2">{{ title }}</h3>
    <p class="dark:text-white text-sm mb-3">{{ description }}</p>
    <div class="rounded-md overflow-hidden">
      <iframe
        :src="embedUrl"
        width="100%"
        height="152"
        frameborder="0"
        :allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        :title="title"
      ></iframe>
    </div>
    <div class="mt-2">
      <UILink :href="websiteUrl" target="_blank">Open on Spotify</UILink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  embedUrl: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
});
</script>
