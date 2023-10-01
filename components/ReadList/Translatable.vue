<template>
    <div
        class="hover:bg-main-orange dark:text-white mr-2 float-left"
        title="Press to translate"
        @click="translate"
    >
        {{ word }}
    </div>
</template>
<script setup lang="ts">


const TRANSLATE_URL = 'https://www.linguee.com/english-dutch/search?source=dutch&query='

const props = defineProps({
        word: String,
    });

    function translate() {
            window.open(TRANSLATE_URL + props.word)
    }
</script>
