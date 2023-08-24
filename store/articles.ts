import {defineStore} from 'pinia'
import {REQUEST_STATUS} from '~/enums/serverRequests'
import Parser from 'rss-parser'
import {sortBy} from "lodash";


const DE_TELEGRAAF_URL = 'https://www.telegraaf.nl/rss/'
//const RTL_URL = 'https://www.nrc.nl/rss/'

const parser = new Parser()

export type Article = {
    title: String
    description: String
    link: String
    contentSnippet: String
}

export type Articles = Article[]

export interface ArticlesState {
    articles: Articles
    request: REQUEST_STATUS
}


export const useArticlesStore = defineStore('articles', {
    // a function that returns a fresh state
    state: ():ArticlesState => ({
        articles: [],
        request: REQUEST_STATUS.IDLE,
    }),
    actions: {
        async getArticles() {
            const rssTelegraaf = await parser.parseURL(DE_TELEGRAAF_URL)
            //const rssRTL = await parser.parseURL(RTL_URL);
            const unsortedArticles:any = rssTelegraaf.items
            this.articles = sortBy(unsortedArticles, 'isoDate').reverse();
        },
    },
})
