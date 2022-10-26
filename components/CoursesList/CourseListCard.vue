<template>
    <div
        class="rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="link"
    >
        <h3>{{ title }}</h3>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        title: String,
    },
})
</script>
