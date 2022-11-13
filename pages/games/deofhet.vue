<template>
    <Container>
        <UITitle orange="Memory" />
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
                    Guilder: <strong>{{ money }}</strong>
                </p>
                <p>Score: {{ score }}</p>
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

export default Vue.extend({
    data() {
        return {
            money: 1000,
            words: [
                { word: 'kind', solution: 'het' },
                { word: 'krant', solution: 'de' },
            ],
            score: 0,
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

        tryAgain() {
            location.reload()
        },

        bet(money: number) {},
    },
})
</script>
