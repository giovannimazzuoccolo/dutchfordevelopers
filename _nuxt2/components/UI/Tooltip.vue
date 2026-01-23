<template>
    <div @mouseover="toogleTooltip()" @mouseout="toogleTooltip()">
        <slot></slot>
        <div
            class="absolute z-10 mt-1 text-sm bg-black text-white dark:bg-blue dark:text-white p-2 rounded-md"
            v-if="showTooltip"
        >
            {{ tooltipText }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        tooltipText: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            showTooltip: false,
        }
    },

    methods: {
        toogleTooltip() {
            console.log('tooltip')
            this.showTooltip = !this.showTooltip
        },
    },
})
</script>
