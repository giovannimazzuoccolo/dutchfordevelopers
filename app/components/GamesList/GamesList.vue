<template>
  <SharedContainer>
    <div v-if="request === REQUEST_STATUS.LOADING">
      <div class="flex w-full flex-1 justify-center items-center">
        <UISpinner/>
      </div>
    </div>
    <div v-else-if="request === REQUEST_STATUS.ERROR">
      <em>Jammer,</em> we are sorry, we are not able to retrieve the games
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <template v-for="game in games">
          <NuxtLink to="game.route">
            <GamesListGameCard
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
import {useGamesStore} from '~/store/games'
import {REQUEST_STATUS} from "~/enums/serverRequests";
import {storeToRefs} from "pinia";

const useGames = useGamesStore();

const {games, request} = storeToRefs(useGames)

const {data: session} = useAuth();
const userId = computed(() => (session.value as any)?.user?.id as string | undefined);
// Captured here (setup top-level) so SSR cookie forwarding is guaranteed.
const requestFetch = useRequestFetch();

// SSR-friendly initial fetch: runs on the server via useAsyncData so the
// games grid is present in view-source. Single round trip to
// /api/games/with-scores, which merges per-user scores server-side when a
// session is available (via forwarded cookies on the server). The cache key
// includes the user id so logging in/out refetches instead of reusing
// another user's (or anonymous) payload, and hydration reuses the payload
// without a duplicate request.
await useAsyncData(
  () => `games-list-${userId.value ?? "anon"}`,
  () => useGames.getGamesWithScore(requestFetch),
)
</script>
