<template>
    <div
        class="opacity-0 duration-700 ease-in-out transition-opacity text-2xl dark:text-white"
        :class="{
            'opacity-0': !isVisible,
            'opacity-100': isVisible,
        }"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            isVisible: false,
        }
    },
    mounted() {
        this.isVisible = true
    },
})
</script>
