import { defineStore } from "pinia";
import { REQUEST_STATUS } from "~/enums/serverRequests";
import { Feed, Parser } from "pulse-feed-parser";
import _ from "lodash";

const DE_TELEGRAAF_URL = "https://www.telegraaf.nl/rss/";
//const RTL_URL = 'https://www.nrc.nl/rss/'

export type Article = {
  title: String;
  description: String;
  link: String;
  contentSnippet: String;
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
      const rssTelegraaf: Feed = await new Parser().parseURL(DE_TELEGRAAF_URL);
      const unsortedArticles: any = rssTelegraaf.items;
      this.request = REQUEST_STATUS.SUCCESS;
      this.articles = _.sortBy(unsortedArticles, "isoDate").reverse();
    },
  },
});
