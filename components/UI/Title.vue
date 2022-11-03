<template>
    <h2
        class="uppercase font-bold text-3xl md:text-5xl text-main-blue dark:text-main-blue-light w-full my-2"
        :class="center ? 'text-center' : 'text-left'"
    >
        <span
            class="text-main-orange dark:text-main-orange-light"
            >{{ orange }}</span
        >
        {{ blue }}
    </h2>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        orange: String,
        blue: String,
        center: {
            type: Boolean,
            required: false,
        },
    },
})
</script>
