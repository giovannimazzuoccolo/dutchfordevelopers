<template>
    <Container>
        <UITitle orange="De or" blue="(B)het" />
        <div class="relative">
            <div
                v-if="success"
                class="flex justify-center items-center absolute top-0 h-full z-10 w-full bg-gray-700/80 backdrop-blur-l flex-col gap-4 round"
            >
                <h2
                    class="text-3xl md:text-5xl text-bold text-main-orange uppercase text-center"
                >
                    🎉 Gefeliciteerd 🎉
                </h2>
                <p class="text-white">
                    You guessed {{ score }} words!
                </p>
                <div class="flex gap-4">
                    <UIButton
                        v-if="isLogged"
                        @click="saveScore"
                        >Save</UIButton
                    >
                    <UIButton @click="tryAgain"
                        >Try again</UIButton
                    >
                </div>
            </div>
            <p class="my-4 dark:text-white">
                Play "De or (b)het", guess if the word is a
                de or an het word, do your bet and don't
                lose your guilder!
            </p>
            <div
                class="flex my-4 dark:text-white justify-between"
            >
                <p>
                    Guilder: <strong>{{ money }} G</strong>
                </p>
                <p>Score: {{ score }}</p>
            </div>

            <div
                class="p-16 flex justify-center items-center gap-4"
            >
                <select
                    v-model="selected"
                    class="text-4xl rounded"
                >
                    <option value="de">De</option>
                    <option value="het">Het</option>
                </select>
                <span class="text-4xl dark:text-white">{{
                    words[wordIndex].word
                }}</span>
            </div>
            <div
                class="p-16 flex justify-center items-center gap-4"
            >
                <UIButton @click="bet(50)"
                    >Bet 50G</UIButton
                >
                <UIButton
                    @click="bet(100)"
                    :disabled="money < 100"
                    >Bet 100G</UIButton
                >
                <UIButton
                    @click="bet(500)"
                    :disabled="money < 500"
                    >Bet 500G</UIButton
                >
            </div>

            <UIAccordion
                title="Instructions"
                text="Select from the dropdown 'De' or 'Het', and make your bet! If you win you receive your bet doubled!"
            />
        </div>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'
import { speak } from '~/utils/tts'
import { wordList } from '~/content/deofhet'
import { shuffle } from 'lodash'

export default Vue.extend({
    data() {
        return {
            selected: 'de',
            money: 1000,
            words: shuffle(wordList),
            score: 0,
            wordIndex: 0,
            voice: [] as SpeechSynthesisVoice[],
            success: false,
        }
    },

    computed: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
    },

    mounted() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices =
                window.speechSynthesis.getVoices()

            this.voice = voices.filter(
                (d) => d.lang === 'nl-NL'
            )
        }
    },

    methods: {
        saveScore() {
            this.$store.dispatch('scores/saveScore', {
                game: 'deofhet',
                score: this.score,
            })
        },

        isLost() {
            if (this.money < 0 && this.score > 0) {
                this.success = true
            }
        },

        bet(betted: number) {
            const { solution } = this.words[this.wordIndex]
            if (solution === this.selected) {
                this.score++
                this.money = this.money + betted * 2
                this.wordIndex++
            } else {
                this.money = this.money - betted
                this.isLost
                this.wordIndex++
            }
        },

        tryAgain() {
            location.reload()
        },
    },
})
</script>
