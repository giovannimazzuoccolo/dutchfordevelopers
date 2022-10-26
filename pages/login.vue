<template>
    <Container>
        <UIBlogWrapper>
            <UIBanner v-if="unauth"
                >You need to login to view this
                section</UIBanner
            >
            <UITitle
                orange="Enter in"
                blue="Dutch for Developers"
                center
            />

            <section
                class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto"
            >
                <button
                    class="py-2 bg-github text-white rounded-lg font-bold border-2 px-20 md:px-28"
                    @click="
                        $store.dispatch('user/githubAuth')
                    "
                >
                    <span class="flex gap-2 items-center">
                        <v-icon
                            name="brands/github"
                            class="fill-current"
                        />
                        Continue with Github</span
                    >
                </button>
                <button
                    class="py-2 bg-linkedin text-white rounded-lg font-bold border-2 px-20 md:px-28"
                    @click="
                        $store.dispatch('user/linkedinAuth')
                    "
                >
                    <span class="flex gap-2 items-center">
                        <v-icon
                            name="brands/linkedin"
                            class="fill-current"
                        />
                        Continue with Linkedin
                    </span>
                </button>
            </section>
        </UIBlogWrapper>
    </Container>
</template>
<script lang="ts">
import 'vue-awesome/icons/brands/linkedin'
import 'vue-awesome/icons/brands/github'
import Icon from 'vue-awesome/components/Icon'
import Vue from 'vue'

export default Vue.extend({
    name: 'Login',
    components: {
        'v-icon': Icon,
    },
    data() {
        return {
            unauth: false,
        }
    },
    methods: {
        setUnauth(value: boolean): void {
            this.unauth = value
        },
    },
    created() {
        const { query } = this.$route.params
        if (query && query.hasOwnProperty('reason')) {
            this.setUnauth(true)
        } else {
            this.setUnauth(false)
        }
    },
})
</script>
