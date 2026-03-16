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
    async getGames() {
      if (this.games.length > 0) {
        this.request = REQUEST_STATUS.SUCCESS;
        return;
      }

      this.request = REQUEST_STATUS.LOADING;
      try {
        // Use server API so this works in client-side rendered pages as well
        const res = (await $fetch("/api/games")) as any;
        if (res && res.success && Array.isArray(res.data)) {
          this.games = res.data as Game[];
        } else if (Array.isArray(res)) {
          // fallback if API returns raw array
          this.games = res as Game[];
        } else {
          this.games = [];
        }
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },
    async getGamesWithScore() {
      this.request = REQUEST_STATUS.LOADING;
      const auth = useAuth();
      const session = auth.data.value;
      const userId = session?.user?.id;

      try {
        const res = (await $fetch("/api/games")) as any;

        const games =
          res && res.success && Array.isArray(res.data)
            ? res.data
            : Array.isArray(res)
              ? res
              : [];

        if (userId) {
          const scoresRes = (await $fetch(
            `/api/scores?userId=${userId}`,
          )) as any;
          debugger;

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
        } else {
          this.games = games as Game[];
        }

        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },
  },
});
