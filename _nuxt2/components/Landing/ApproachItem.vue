<template>
    <div class="flex justify-center items-center md:w-1/3 flex-col gap-4 p-2 dark:text-white">
        <slot></slot>
        <p class="text-center">{{ text }}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: String,
    },
})
</script>
