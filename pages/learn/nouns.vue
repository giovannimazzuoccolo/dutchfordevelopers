<template>
    <container>
        <UIArticleBlock>
            <nuxt-content
                :document="page"
                class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words mx-auto"
            />
        </UIArticleBlock>
        <UIButton>Mark this lesson as read</UIButton>
    </container>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            page: null,
        }
    },
    async asyncData({ $content }) {
        const page = await $content('nouns').fetch()
        return { page }
    },
})
//class="prose dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
</script>
