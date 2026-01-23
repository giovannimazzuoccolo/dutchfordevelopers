<template>
  <div
      class="w-72 flex flex-col gap-8 items-center justify-center bg-red-900 text-white py-24 rounded"
  >
    <h1 class="uppercase text-sm text-red-300">Passport</h1>
    <p class="text-6xl">🦁</p>

    <p class="text-2xl">{{ verb }}</p>
  </div>
</template>
<script setup lang="ts">

defineProps({
  verb: String,
})

</script>
