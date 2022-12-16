<template>
    <div class="text-center py-4 lg:px-4" v-if="shown">
        <div
            class="py-2 px-4 items-center border-red-400 text-red-700 bg-red-100 border leading-none lg:rounded-full flex lg:inline-flex dark:border-red-700 dark:bg-red-900 dark:text-red-300"
            role="alert"
        >
            <span
                class="font-semibold mr-2 text-left flex-auto"
                ><slot
            /></span>
            <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                @click="closeBanner()"
            >
                <title>Close</title>
                <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
            </svg>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            shown: true,
        }
    },
    methods: {
        closeBanner() {
            this.shown = false
        },
    },
})
</script>
