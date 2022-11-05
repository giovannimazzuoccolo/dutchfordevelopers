<template>
    <container>
        <UIArticleBlock>
            <nuxt-content
                :document="page"
                class="prose prose-slate prose-sm sm:prose lg:prose-lg xl:prose-xl prose-strong:text-main-orange mx-auto dark:prose-invert"
            />
        </UIArticleBlock>
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
</script>
