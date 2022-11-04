<template>
    <details
        class="bg-gray-50 my-2 cursor-pointer rounded-sm w-full border min-w-full dark:bg-slate-800 dark:border-slate-700"
    >
        <summary class="text-lg mb-1 p-4 dark:text-white">
            {{ title }}
        </summary>
        <p
            class="p-4 bg-white dark:text-white dark:bg-slate-800"
        >
            {{ text }}
        </p>
    </details>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: String,
        title: String,
    },
})
</script>
