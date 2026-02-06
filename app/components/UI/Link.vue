<template>
    <a :href="href" :target="target" class="text-main-orange cursor-pointer hover:underline"
        ><slot
    /></a>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        href: String,
        target: String,
    },
})
</script>
