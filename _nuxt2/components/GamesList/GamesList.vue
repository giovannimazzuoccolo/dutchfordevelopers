<template>
    <Container>
        <div v-if="loadStatus === 'loading'">
            <div class="flex w-full flex-1 justify-center items-center">
                <UISpinner />
            </div>
        </div>
        <div v-else-if="loadStatus === 'error'">
            <em>Jammer,</em> we are sorry, we are not able to retrieve the games
        </div>
        <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <template v-for="games in gamesList">
                    <NuxtLink :to="games.route">
                        <GamesListGameCard
                            :name="games.name"
                            :description="games.description"
                            :route="games.route"
                            :score="games.score"
                            :icon="games.fa_icon"
                        />
                    </NuxtLink>
                </template>
            </div>
        </div>
    </Container>
</template>
<script>
import { mapState } from 'vuex'

import Vue from 'vue'
import Container from '~/components/Container.vue'

export default Vue.extend({
    components: { Container },
    mounted() {
        if (this.$store.getters['user/isLogged']) {
            this.$store.dispatch('games/getGamesWithScore')
        } else {
            this.$store.dispatch('games/getGames')
        }
    },
    computed: mapState({
        loadStatus: (state) => state.games.request,
        gamesList: (state) => state.games.games,
    }),
})
</script>
