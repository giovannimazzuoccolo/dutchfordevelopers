<template>
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-4 cursor-pointer hover:bg-gray-100"
        role="link"
        @click="navigate"
    >
        <h3 class="uppercase text-xl text-main-orange my-2">
            {{ title }}
        </h3>
        <p>{{ description }}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        title: String,
        description: String,
        route: String,
    },
    methods: {
        navigate() {
            this.$router.push(this.route)
        },
    },
})
</script>
