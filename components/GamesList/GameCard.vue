<template>
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-4 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600"
        role="link"
        @click="navigate"
    >
        <h3 class="uppercase text-xl text-main-orange my-2">
            {{ name }}
        </h3>
        <p class="dark:text-white">{{ description }}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        name: String,
        description: String,
        route: String,
        score: {
            type: String,
            required: false,
        },
    },
    methods: {
        navigate() {
            this.$router.push(this.route)
        },
    },
})
</script>
