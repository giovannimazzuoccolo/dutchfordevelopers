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
    props: {
        delay: Number,
    },
    data() {
        return {
            isVisible: false,
            interval: 0,
        }
    },
    created() {
        this.interval = this.counterFunc()
    },
    methods: {
        counterFunc(): number {
            return window.setInterval(() => {
                this.isVisible = true
            }, this.delay * 1000)
        },
    },
})
</script>
