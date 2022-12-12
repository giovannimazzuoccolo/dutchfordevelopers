<template>
    <Container>
        <div v-if="loadStatus === 'loading'">
            <div
                class="flex w-full flex-1 justify-center items-center"
            >
                <UISpinner />
            </div>
        </div>
        <div
            v-else-if="loadStatus === 'error'"
            class="dark:text-white"
        >
            <em>Jammer,</em> we are sorry, we are not able
            to retrieve any article 😔
        </div>
        <div v-else="loadStatus === 'success'">
            <p class="text-center dark:text-white m-4">
                A list of news in Dutch with one-click
                translation. Actually the news source is
                only De Telegraaf.<br />
                If you have any other rss resource please
                <UILink
                    href="https://github.com/giovannimazzuoccolo/dutchfordevelopers/issues"
                    target="_blank"
                    >open an issue</UILink
                >
                or use the
                <NuxtLink to="/contacts"
                    >contact page</NuxtLink
                >
            </p>
            <div
                class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
                <template v-for="article in articlesList">
                    <ArticleCard
                        :title="article.title"
                        :link="article.link"
                        :description="article.description"
                        :contentSnippet="
                            article.contentSnippet
                        "
                    />
                </template>
            </div>
        </div>
    </Container>
</template>
<script>
import { mapState } from 'vuex'

import Vue from 'vue'
import ArticleCard from './ArticleCard.vue'

export default Vue.extend({
    mounted() {
        this.$store.dispatch('articles/getArticles')
    },
    computed: mapState({
        loadStatus: (state) => state.articles.request,
        articlesList: (state) => state.articles.articles,
    }),
    components: { ArticleCard },
})
</script>
