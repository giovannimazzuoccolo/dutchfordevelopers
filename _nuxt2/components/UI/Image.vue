<template>
    <img :src="src" :alt="alt" :class="[rounded && 'rounded-md', extraspacing && 'my-6']" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        src: String,
        alt: String,
        rounded: {
            type: Boolean,
            required: false,
        },
        extraspacing: {
            type: Boolean,
            required: false,
        },
    },
})
</script>
