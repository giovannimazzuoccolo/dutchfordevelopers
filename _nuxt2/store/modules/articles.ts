import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { REQUEST_STATUS } from '~/enums'
import Parser from 'rss-parser'
import { sortBy } from 'lodash'

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

export const state: ArticlesState = {
    articles: [],
    request: REQUEST_STATUS.IDLE,
}

const getters: GetterTree<any, any> = {
    articles: (state) => state.articles,
    request: (state) => state.request,
}

const mutations: MutationTree<ArticlesState> = {
    REQUEST_STARTED: (state) => {
        return (state.request = REQUEST_STATUS.LOADING)
    },
    REQUEST_ERROR: (state) => {
        return (state.request = REQUEST_STATUS.ERROR)
    },
    REQUEST_SUCCESS: (state) => {
        return (state.request = REQUEST_STATUS.SUCCESS)
    },
    ADD_DATA: (state, articles) => {
        return (state.articles = articles)
    },
}

const actions: ActionTree<any, any> = {
    async getArticles() {
        const rssTelegraaf = await parser.parseURL(DE_TELEGRAAF_URL)
        //const rssRTL = await parser.parseURL(RTL_URL);
        const unsortedArticles = rssTelegraaf.items
        //const unsortedArticles= rssTelegraaf.items
        const articles = sortBy(unsortedArticles, 'isoDate').reverse()
        console.log(articles)
        this.commit('articles/ADD_DATA', articles)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
