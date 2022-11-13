<template>
    <div>
        <article
            class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
        >
            <nuxt-content
                :document="page"
                class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words"
            />
            <UILessonInfo />
        </article>
        <Container>
            <div class="my-4">
                <UIButton
                    >Mark this lesson as read</UIButton
                >
            </div>
        </Container>
    </div>
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
