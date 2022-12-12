<template>
    <div
        class="hover:bg-main-orange dark:text-white mr-2 float-left"
        title="Press to translate"
        @click="translate"
    >
        {{ word }}
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

const TRANSLATE_URL =
    'https://www.linguee.com/english-dutch/search?source=dutch&query='

export default Vue.extend({
    props: {
        word: String,
    },
    methods: {
        translate() {
            window.open(TRANSLATE_URL + this.word)
        },
    },
})
</script>
