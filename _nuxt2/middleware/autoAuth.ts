import { Middleware } from '@nuxt/types'

/**
 * Try to authenticate automatically, calling the middleware everytime we load a page.
 */
const autoAuth: Middleware = async ({ store }) => {
    await store.dispatch('user/autoAuthenticate')
}

export default autoAuth
