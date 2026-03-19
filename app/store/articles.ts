import { defineStore } from "pinia";
import { REQUEST_STATUS } from "~/enums/serverRequests";

export type Article = {
  title: string;
  description: string;
  link: string;
  contentSnippet: string;
};

export type Articles = Article[];

export interface ArticlesState {
  articles: Articles;
  request: REQUEST_STATUS;
}

export const useArticlesStore = defineStore("articles", {
  // a function that returns a fresh state
  state: (): ArticlesState => ({
    articles: [],
    request: REQUEST_STATUS.LOADING,
  }),
  actions: {
    async getArticles() {
      try {
        const rssTelegraaf = await $fetch<any>("/api/articles");
        const unsortedArticles: any = rssTelegraaf.items || [];
        this.request = REQUEST_STATUS.SUCCESS;
        this.articles = unsortedArticles;
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        this.request = REQUEST_STATUS.ERROR;
        this.articles = [];
        // Keep error handled gracefully - don't throw to avoid full page error
        // The component will show the error state from REQUEST_STATUS.ERROR
      }
    },
  },
});
