<template>
    <Container>
        <div v-if="loadStatus === 'loading'">
            <div
                class="flex w-full flex-1 justify-center items-center"
            >
                <UISpinner />
            </div>
        </div>
        <div v-else-if="loadStatus === 'error'">
            <em>Jammer,</em> we are sorry, we are not able
            to retrieve the games
        </div>
        <div v-else="loadStatus === 'success'">
            <div class="grid grid-cols-3 gap-4">
                <template v-for="games in gamesList">
                    <NuxtLink :to="games.route">
                        <GamesListGameCard
                            :name="games.name"
                            :description="games.description"
                            :route="games.route"
                            :score="games.score"
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

export default Vue.extend({
    mounted() {
        this.$store.dispatch('games/getGamesWithScore')
    },
    computed: mapState({
        loadStatus: (state) => state.games.request,
        gamesList: (state) => state.games.games,
    }),
})
</script>
