import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";

export type Game = {
  id: string;
  name: string;
  description: string;
  route: string;
  fa_icon: string;
  score?: string | number;
};

export type Games = Game[];

export interface GamesState {
  games: Game[];
  request: REQUEST_STATUS;
  error: string;
}

export const useGamesStore = defineStore("games", {
  state: (): GamesState => ({
    games: [],
    request: REQUEST_STATUS.IDLE,
    error: "",
  }),
  actions: {
    getRequestFetch() {
      try {
        return useRequestFetch() as typeof $fetch;
      } catch {
        return $fetch;
      }
    },
    async getGames() {
      if (this.games.length > 0) {
        this.request = REQUEST_STATUS.SUCCESS;
        return this.games;
      }

      this.request = REQUEST_STATUS.LOADING;
      try {
        const requestFetch = this.getRequestFetch();
        // Use server API so this works in client-side rendered pages as well
        const res = (await requestFetch("/api/games")) as any;
        if (res && res.success && Array.isArray(res.data)) {
          this.games = res.data as Game[];
        } else if (Array.isArray(res)) {
          // fallback if API returns raw array
          this.games = res as Game[];
        } else {
          this.games = [];
        }
        this.request = REQUEST_STATUS.SUCCESS;
        return this.games;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        return [];
      }
    },
    async getGamesWithScore(fetcher?: typeof $fetch) {
      this.request = REQUEST_STATUS.LOADING;
      // Prefer an injected fetch (captured via useRequestFetch at the
      // component level where Nuxt context is guaranteed) so cookies are
      // forwarded during SSR. Single round trip: the endpoint merges
      // per-user scores server-side via the session, serving the plain
      // list to anonymous callers. No early-return guard here: the data is
      // user-scoped (scores) and useAsyncData's per-user cache key handles
      // de-duplication instead.
      const requestFetch = fetcher ?? this.getRequestFetch();

      try {
        const res = (await requestFetch("/api/games/with-scores")) as any;

        if (res && res.success && Array.isArray(res.data)) {
          this.games = res.data as Game[];
        } else if (Array.isArray(res)) {
          // fallback if API returns raw array
          this.games = res as Game[];
        } else {
          this.games = [];
        }

        this.request = REQUEST_STATUS.SUCCESS;
        return this.games;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        return [];
      }
    },
  },
});
