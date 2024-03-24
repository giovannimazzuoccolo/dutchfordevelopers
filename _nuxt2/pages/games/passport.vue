<template>
    <Container>
        <UITitle orange="Passport" blue="Control" />
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

            <div class="flex gap-3 flex-col justify-between md:flex-row">
                <div class="flex justify-center items-center gap-4 flex-col md:w-full">
                    <PassportCover :verb="getWord" />
                    <p class="dark:text-white italic">({{ getTranslation }})</p>
                </div>

                <div class="flex justify-center gap-4 flex-col md:w-full md:p-12">
                    <h2 class="dark:text-white">Queue</h2>
                    <div class="mb-2">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                            for="person"
                        >
                            Person
                        </label>
                        <select
                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Person"
                            v-model="person"
                        >
                            <option value="first_singular">First singular</option>
                            <option value="second_singular">Second singular</option>
                            <option value="third_singular">Third singular</option>
                            <option value="first_plural">First plural</option>
                            <option value="second_plural">Second plural</option>
                            <option value="third_plural">Third plural</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                            for="form"
                        >
                            Form
                        </label>
                        <select
                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="form"
                            v-model="form"
                        >
                            <option value="present">Present</option>
                            <option value="past_participle">Past participle</option>
                            <option value="past">Past</option>
                            <option value="future">Future</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <div>
                            <div class="form-check mb-1">
                                <p
                                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                                >
                                    Regular or irregular?
                                </p>
                                <input
                                    class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="radio"
                                    name="regularOrIrregular"
                                    id="regularRadio"
                                    value="regular"
                                    v-model="regularOrIrregular"
                                />
                                <label
                                    class="form-check-label inline-block text-gray-800 dark:text-gray-100"
                                    for="regularRadio"
                                >
                                    Regular
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="radio"
                                    name="regularOrIrregular"
                                    id="irregularRadio"
                                    value="irregular"
                                    v-model="regularOrIrregular"
                                />
                                <label
                                    class="form-check-label inline-block text-gray-800 dark:text-gray-100"
                                    for="irregularRadio"
                                >
                                    Irregular
                                </label>
                            </div>
                        </div>
                    </div>
                    <UIButton @click="confirmChoice">Confirm</UIButton>
                    <div :class="isLastGuessCorrect ? 'text-green-400' : 'text-red-400'">
                        {{ lastWord }}
                    </div>
                </div>
            </div>
            <UIAccordion
                title="Instructions"
                text="Select the right verb form to gain points. If you make a mistake, a new element goes to the queue. If the line reaches 10 verbs you lost."
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
import PassportCover from '~/components/Games/Passport/PassportCover.vue'

export default Vue.extend({
    data() {
        return {
            form: TENSE.PRESENT,
            person: PERSON.FIRST_SINGULAR,
            regularOrIrregular: true,
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
        getTranslation() {
            return this.words[this.wordIndex].translation
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
        getSolution() {
            return {
                form: this.words[this.wordIndex].tense,
                person: this.words[this.wordIndex].person,
                regularOrIrregular: this.words[this.wordIndex].regular,
            }
        },
        tryAgain() {
            location.reload()
        },
        goNext() {
            if (this.wordIndex + 1 === this.words.length) {
                this.success = true
            } else {
                this.wordIndex++
            }
        },
        confirmChoice() {
            console.log(this.form, this.person, this.regularOrIrregular)
            const { form, person, regularOrIrregular } = this.getSolution()

            if (form === this.form && person === this.person) {
                this.score++
                this.lastWord = ` ${this.words[this.wordIndex].verb} is correct! 👍`
                this.isLastGuessCorrect = true
                this.goNext()
            } else {
                this.line++
                this.lastWord = ` ${this.words[this.wordIndex].verb} is wrong! 👎`
                this.isLastGuessCorrect = false
                if (this.line === 10) {
                    this.fail = true
                }
                this.goNext()
            }
        },
    },
    components: { PassportCover },
})
</script>
