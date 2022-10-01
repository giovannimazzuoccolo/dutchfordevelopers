import { Middleware } from '@nuxt/types'

const autoAuth: Middleware = async ({ store }) => {

    await store.dispatch(
        'user/autoAuthenticate'
    )



};

export default autoAuth;

/*export default function ({store, redirect}) {

}*/