import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { useToastStore } from "~/store/toasts";

export type Score = {
  id: String;
  game: String;
  score: String;
  user: String;
};

export type Scores = Score[];

export interface ScoreState {
  scores: Score[];
  request: REQUEST_STATUS;
  error: string;
}
export const useScores = defineStore("scores", {
  state: (): ScoreState => ({
    scores: [],
    request: REQUEST_STATUS.IDLE,
    error: "",
  }),
  actions: {
    async getScore() {
      this.request = REQUEST_STATUS.LOADING;
      try {
        const res = await $fetch("/api/scores", { method: "GET" });
        // expect { success: true, data }
        // @ts-ignore
        this.scores = res.data || [];
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message || "Cannot fetch scores";
      }
    },
    async getScoreByUserId() {
      this.request = REQUEST_STATUS.LOADING;
      this.request = REQUEST_STATUS.LOADING;
      try {
        const session = await $fetch("/api/auth/session");
        const userId = session?.user?.id;
        if (!userId) {
          this.request = REQUEST_STATUS.ERROR;
          this.error = "Unauthorized";
          return;
        }
        const res = await $fetch(`/api/scores?userId=${userId}`);
        // @ts-ignore
        this.scores = res.data || [];
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message || "Cannot fetch user scores";
      }
    },
    async getScoreByGameAndCurrentUser(gameRoute: string) {
      this.request = REQUEST_STATUS.LOADING;
      try {
        const session = await $fetch("/api/auth/session");
        const userId = session?.user?.id;
        if (!userId) {
          this.request = REQUEST_STATUS.ERROR;
          this.error = "Unauthorized";
          return;
        }
        const res = await $fetch(
          `/api/scores?userId=${userId}&gameRoute=${encodeURIComponent(gameRoute)}`
        );
        // @ts-ignore
        this.scores = res.data || [];
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message || "";
      }
    },
    async saveScore(game: string, score: string | number, id?: string) {
      this.request = REQUEST_STATUS.LOADING;
      const toastStore = useToastStore();
      try {
        // if id provided, update; otherwise create
        const payload: any = { gameRoute: game, score };
        if (id) payload.id = id;
        const res = await $fetch("/api/scores", {
          method: "POST",
          body: payload,
        });
        // @ts-ignore
        if (res?.success) {
          this.request = REQUEST_STATUS.SUCCESS;
          toastStore.showToast(
            id ? "Score updated successfully" : "Score saved successfully"
          );
        } else {
          this.request = REQUEST_STATUS.ERROR;
          this.error = "Error saving score";
          toastStore.showToast("Error saving score");
        }
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message || "Error saving score";
        toastStore.showToast("Error saving score");
      }
    },
  },
});
