import {REQUEST_STATUS} from '~/enums/serverRequests'
import {defineStore} from "pinia";
import {useSupabaseClient} from "#imports";

export type Score = {
    id: String
    game: String
    score: String
    user: String
}

export type Scores = Score[]

export interface ScoreState {
    scores: Score[]
    request: REQUEST_STATUS
    error: string
}

const client = useSupabaseClient()

export const useScores = defineStore('scores', {
    state: ():ScoreState => ({
        scores: [],
        request: REQUEST_STATUS.IDLE,
        error: ''
    }),
    actions: {
        async getScore() {
            this.request = REQUEST_STATUS.LOADING;
            const { data, error } = await client.from('scores').select();
            if(!error) {
                this.request = REQUEST_STATUS.SUCCESS;
                this.scores = data;
            } else {
                this.request = REQUEST_STATUS.ERROR;
                this.error = error.message;
            }
        },
        async getScoreByUserId() {
            this.request = REQUEST_STATUS.LOADING;
            const userInfo = await client.auth.getUser();
            const { data, error } = await client.from('scores').select().eq('user_id', userInfo.data.user?.id);
            if(!error) {
                this.request = REQUEST_STATUS.SUCCESS;
                this.scores = data;
            } else {
                this.request = REQUEST_STATUS.ERROR;
                this.error = error.message;
            }
        },
        async getScoreByGameAndCurrentUser(gameRoute: string) {
            this.request = REQUEST_STATUS.LOADING;
            const userInfo = await client.auth.getUser();
            if(userInfo) {
                const { data, error } = await client.from('scores').select().eq('user_id', userInfo.data.user?.id).eq('game', gameRoute);
                if(!error) {
                    this.request = REQUEST_STATUS.SUCCESS;
                    //TODO: check where this function is being called and refactor it on a single score
                    this.scores = data;
                } else {
                    this.request = REQUEST_STATUS.ERROR;
                    this.error = '';
                }
            }
        },
        async saveScore(game:string, score:string|number) {
            this.request = REQUEST_STATUS.LOADING;
            const userInfo = await client.auth.getUser()
            if (userInfo) {
                const values:any = { game, score, user_id: userInfo.data.user?.id };
                const { error } = await client
                    .from('scores')
                    .insert(values)
                if (!error) {
                    this.request = REQUEST_STATUS.SUCCESS;
                } else {
                    this.request = REQUEST_STATUS.ERROR;
                    this.error = error.message
                }
            } else {
                console.error('No user defined')
            }
        }
    }
})
