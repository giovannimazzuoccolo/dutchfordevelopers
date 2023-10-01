<template>
  <SharedContainer>
    <div v-if="request === REQUEST_STATUS.LOADING">
      <div class="flex w-full flex-1 justify-center items-center">
        <UISpinner/>
      </div>
    </div>
    <div v-else-if="request === REQUEST_STATUS.ERROR" class="dark:text-white">
      <em>Jammer,</em> we are sorry, we are not able to retrieve any article 😔
    </div>
    <div v-else>
      <p class="text-center dark:text-white m-4">
        A list of news articles in Dutch, which can be translated with just one click.
        Please note that the news source currently used is De Telegraaf. <br/>
        If you know of any other RSS resources that you would like me to consider, please
        let me know by.
        <UILink
            href="https://github.com/giovannimazzuoccolo/dutchfordevelopers/issues"
            target="_blank"
        >opening an issue
        </UILink
        >
        or use the
        <NuxtLink to="/contacts">contact page</NuxtLink>
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="article in articles">
          <ArticleCard
              :contentSnippet="article.contentSnippet"
              :description="article.description"
              :link="article.link"
              :title="article.title"
          />
        </template>
      </div>
    </div>
  </SharedContainer>
</template>
<script lang="ts" setup>
import {REQUEST_STATUS} from "~/enums/serverRequests";
import {useArticlesStore} from "~/store/articles";
import ArticleCard from "~/components/ReadList/ArticleCard.vue";

const {articles, getArticles, request} = useArticlesStore()

onMounted(() => getArticles())

</script>
