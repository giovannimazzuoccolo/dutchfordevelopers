<template>
    <div v-html="markdownToHtml"></div>
</template>
<script lang="ts">
import marked from 'marked'
import Vue from 'vue'
const nouns = require('./../../content/lessons/nouns.md')

Vue.extend({
    data() {
        return {
            text: nouns,
        }
    },
    computed: {
        markdownToHtml() {
            return marked(nouns)
        },
    },
})
</script>
