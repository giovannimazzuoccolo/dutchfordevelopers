<template>
    <button
        @click="callback($event)"
        class="py-2 px-4 bg-main-orange text-white rounded font-bold border-2 border-main-orange hover:bg-white hover:text-main-orange transition ease-in-out"
    >
        {{ text }}
        <slot />
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        text: String,
    },
    methods: {
        callback: function (e: MouseEvent) {
            this.$emit('click', e)
        },
    },
})
</script>
