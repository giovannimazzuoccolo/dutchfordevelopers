<template>
    <SharedContainer>
        <div v-if="request === 'loading'">
            <div class="flex w-full flex-1 justify-center items-center">
                <UISpinner />
            </div>
        </div>
        <div v-else-if="request === 'error'">
            <em>Jammer,</em> we are sorry, we are not able to retrieve the games
        </div>
        <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <template v-for="game in games">
                    <NuxtLink to="game.route">
                        <GameCard
                            :name="game.name"
                            :description="game.description"
                            :route="game.route"
                            :score="game.score"
                            :icon="game.fa_icon"
                        />
                    </NuxtLink>
                </template>
            </div>
        </div>
    </SharedContainer>
</template>
<script setup lang="ts">

import { useGamesStore } from '~/store/games'
import {REQUEST_STATUS} from "~/enums/serverRequests";

const { games, request, error, getGames, getGamesWithScore } = useGamesStore();

onMounted(() => getGames());
</script>
