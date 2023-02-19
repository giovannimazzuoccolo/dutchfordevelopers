<template>
    <div
        class="w-52 flex flex-col gap-4 items-center justify-center bg-red-900 text-white py-12 rounded"
    >
        <h1 class="uppercase text-sm text-red-300">Passport</h1>
        <p class="text-6xl">🦁</p>

        <p class="text-3xl">{{ verb }}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        verb: String,
    },
})
</script>
