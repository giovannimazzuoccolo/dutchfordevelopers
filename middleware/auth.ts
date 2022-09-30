import { Middleware } from '@nuxt/types'
import { GlobalStore } from '~/store';

const auth: Middleware = async ({ store, redirect }) => {
    console.log('middleware started');

    const res = await store.dispatch(
        'user/autoAuthenticate'
    )

    console.log('res');

    const typedStore = store as unknown as GlobalStore;
    console.log('ty', typedStore);
    debugger;
    if (!typedStore.user.userInfo) {
        return redirect('/?logoutReason=unauthenticated')
    }


};

export default auth;

/*export default function ({store, redirect}) {

}*/