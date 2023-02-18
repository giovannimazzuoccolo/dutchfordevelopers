<template>
    <Container>
        <UITitle orange="De or" blue="(B)het" />
        <div class="relative">
            <GamesSuccess v-if="success">
                <p class="text-white">
                    You guessed {{ score }} verbs! Your best score is {{ pastScore }} verbs
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="isLogged && score > pastScore" @click="saveScore"
                        >Save</UIButton
                    >
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </GamesSuccess>

            <GamesOver v-if="fail">
                <p class="text-white">The queue is too long, you lose 😔</p>
                <div class="flex gap-4">
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </GamesOver>

            <p class="my-4 dark:text-white">
                Play passport control, put the verbs in the right queue and keep the line as short
                as possible
            </p>
            <div class="flex my-4 dark:text-white justify-between">
                <p>
                    Verbs in line: <strong>{{ line }}</strong>
                </p>
                <p>Score: {{ score }}</p>
            </div>

            <div class="p-16 flex justify-center items-center gap-4 flex-col">
                {{ getWord }}
            </div>

            <div class="p-16 flex justify-center items-center gap-4"></div>

            <UIAccordion
                title="Instructions"
                text="Select the right verb form to gain points. If you make a mistake, a new element goes to the queue. If you reach 10 verbs you lost."
            />
        </div>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'
import { TENSE, PERSON, REGULAR_IRREGULAR, wordList } from '~/content/passport'
import { shuffle } from 'lodash'
import GamesSuccess from '~/components/Games/Status/GamesSuccess.vue'
import GamesOver from '~/components/Games/Status/GamesOver.vue'

export default Vue.extend({
    data() {
        return {
            form: TENSE.PRESENT,
            person: PERSON.FIRST_SINGULAR,
            regularOrIrregular: REGULAR_IRREGULAR.REGULAR,
            line: 1,
            words: shuffle(wordList),
            score: 0,
            wordIndex: 0,
            voice: [] as SpeechSynthesisVoice[],
            success: false,
            fail: false,
            lastWord: '',
            isLastGuessCorrect: false,
            pastScore: 0,
        }
    },
    computed: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        getWord() {
            return this.words[this.wordIndex].verb
        },
        getSolution() {
            return this.words[this.wordIndex].verb
        },
    },
    mounted() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices()
            this.voice = voices.filter((d) => d.lang === 'nl-NL')
        }
    },
    methods: {
        saveScore() {
            this.$store.dispatch('scores/saveScore', {
                game: 'games/passport',
                score: this.score,
            })
        },
        async increaseWordIndexOrSuccess() {
            if (this.wordIndex + 1 === this.words.length) {
                const score = await this.$store.dispatch(
                    'scores/getScoreByGameAndCurrentUser',
                    'games/passport'
                )
                this.pastScore = score[0].score ? score[0].score : 0

                this.success = true
            } else {
                this.wordIndex++
            }
        },

        tryAgain() {
            location.reload()
        },
    },
})
</script>
