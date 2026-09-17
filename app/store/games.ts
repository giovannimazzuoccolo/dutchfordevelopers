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
    async getGamesWithScore(fetcher?: typeof $fetch, userId?: string) {
      this.request = REQUEST_STATUS.LOADING;
      // Prefer an injected fetch (captured via useRequestFetch at the
      // component level where Nuxt context is guaranteed) so cookies are
      // forwarded during SSR. No early-return guard here: the data is
      // user-scoped (scores) and useAsyncData's per-user cache key handles
      // de-duplication instead. When userId is unknown (e.g. SSR before the
      // client auth state resolves), the scores endpoint falls back to
      // getServerSession via the forwarded cookies.
      const requestFetch = fetcher ?? this.getRequestFetch();

      try {
        const res = (await requestFetch("/api/games")) as any;

        const games =
          res && res.success && Array.isArray(res.data)
            ? res.data
            : Array.isArray(res)
              ? res
              : [];

        const scoresRes = (await requestFetch("/api/scores", {
          params: userId ? { userId } : {},
        }).catch(() => ({ success: true, data: [] }))) as any;

        const scores =
          scoresRes && scoresRes.success && Array.isArray(scoresRes.data)
            ? scoresRes.data
            : Array.isArray(scoresRes)
              ? scoresRes
              : [];

        this.games = games.map((d: any) => ({
          ...d,
          score: scores.find((s: any) => s.gameId === d.id)?.score,
        }));

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
