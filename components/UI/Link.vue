<template>
    <a
        :href="href"
        :target="target"
        class="hover:underline"
        :class="dark ? `main-orange` : `text-blue-800`"
        ><slot
    /></a>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        href: String,
        target: String,
        dark: Boolean,
    },
})
</script>
