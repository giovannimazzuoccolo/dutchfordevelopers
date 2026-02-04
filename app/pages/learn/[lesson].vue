<script setup lang="ts">
const route = useRoute()

// get the last part of the path 


const lesson = route.params.lesson as string;

const { data: lessons } = await useAsyncData(route.path, () => queryCollection('learn').where('id', '=', lesson).first());

console.log('lessons', lessons);

// useSeoMeta({
//   title: lesson.value?.title,
//   description: lesson.value?.description
// })
</script>

<template>
  <ContentRenderer v-if="lessons" :value="lessons" />
  <div v-else>Lesson not found</div>
</template>