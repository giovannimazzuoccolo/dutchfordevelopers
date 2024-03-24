import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { SupabaseClient } from "@supabase/supabase-js";

export type Game = {
  id: String;
  name: String;
  description: String;
  route: String;
  fa_icon: String;
  score?: string | number;
};

export type Games = Game[];

export interface GamesState {
  games: Game[];
  request: REQUEST_STATUS;
  error: string;
}

function supabaseClient() {
  const { $supabase } = useNuxtApp();
  return $supabase as SupabaseClient;
}

export const useGamesStore = defineStore("games", {
  state: (): GamesState => ({
    games: [],
    request: REQUEST_STATUS.IDLE,
    error: "",
  }),
  actions: {
    async getGames() {
      const client = supabaseClient();

      if (this.games.length > 0) {
        this.request = REQUEST_STATUS.SUCCESS;
      } else {
        this.request = REQUEST_STATUS.LOADING;
        const { data, error } = await client.from("games").select();
        if (!error) {
          this.request = REQUEST_STATUS.SUCCESS;
          this.games = data as Game[];
        } else {
          this.request = REQUEST_STATUS.ERROR;
          this.error = error.message;
        }
      }
    },
    async getGamesWithScore() {
      const client = supabaseClient();

      this.request = REQUEST_STATUS.LOADING;
      const userInfo = await client.auth.getUser();
      if (userInfo) {
        const { data, error } = await client.from("games").select("*");
        if (!error) {
          const { data: scores, error: scoresErr } = await client
            .from("scores")
            .select("game,score")
            .eq("user_id", userInfo.data.user?.id);
          if (!scoresErr) {
            this.request = REQUEST_STATUS.SUCCESS;
            const games = data as Game[];
            const gamesWithScore = games.map((d) => ({
              ...d,
              score: scores?.find((s) => s.game === d.route)?.score,
            }));
            this.games = gamesWithScore;
          }
        } else {
          this.request = REQUEST_STATUS.ERROR;
          this.error = "Error fetching scores";
        }
      }
    },
  },
});
