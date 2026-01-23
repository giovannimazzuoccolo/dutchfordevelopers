import { Middleware } from '@nuxt/types'

/**
 * Check if the page is restricted for logged users or not
 */
const restricted: Middleware = async ({ store, redirect }) => {
    if (!store.getters['user/isLogged']) {
        return redirect('/login?reason=unauth')
    }
}

export default restricted
