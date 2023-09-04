// from https://fontawesome.com/docs/web/use-with/vue/use-with
import {library, config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {far} from '@fortawesome/free-regular-svg-icons';
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";


// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(far)
library.add(faLinkedin)
library.add(faGithub)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
