<template>
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-4 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600 flex flex-col"
        role="link"
    >
        <h3 class="text-xl text-main-orange my-2" @click="navigate">
            {{ title }}
        </h3>
        <div class="gap-2 w-100">
            <template v-for="word in getWords">
                <Translatable :word="word" />
                <!--<p class="dark:text-white">{{ contentSnippet }}</p>-->
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Translatable from './Translatable.vue'

export default Vue.extend({
    props: {
        title: String,
        description: String,
        link: String,
        contentSnippet: String,
    },
    computed: {
        getWords() {
            return this.contentSnippet.split(' ')
        },
    },
    methods: {
        navigate() {
            location.href = this.$props.link
        },
    },
    components: {
        Translatable,
    },
})
</script>
