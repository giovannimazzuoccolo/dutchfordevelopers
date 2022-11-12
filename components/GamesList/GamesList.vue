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
                    <GamesListGameCard
                        :title="games.title"
                        :description="games.description"
                    />
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
        this.$store.dispatch('games/getGames')
    },
    computed: mapState({
        loadStatus: (state) => state.games.request,
        gamesList: (state) => state.games.games,
    }),
})
</script>
