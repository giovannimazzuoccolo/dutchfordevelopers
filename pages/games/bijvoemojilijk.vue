<template>
    <Container>
        <UITitle orange="De or" blue="(B)het" />
        <div class="relative">
            <GamesSuccess v-if="success">
                <p class="text-white">
                    You guessed {{ score }} words! Your best score is {{ pastScore }} words
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="isLogged && score > pastScore" @click="saveScore"
                        >Save</UIButton
                    >
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </GamesSuccess>

            <p class="my-4 dark:text-white">Play bijvoemojilijk, how many emojis you can guess?</p>
            <div class="flex my-4 dark:text-white justify-between">
                <p>Score: {{ score }}</p>
                <p>Lives: {{ lives }}</p>
            </div>

            <div class="p-16 flex justify-center items-center gap-4 flex-col">
                <div>
                    <span class="text-4xl dark:text-white">{{ getWord }}</span>
                </div>

                <div class="p-16 flex justify-center items-center gap-4 text-5xl">
                    <ul class="flex gap-5">
                        <li
                            v-for="emoji in possibleSolutions"
                            :key="emoji.english"
                            class="cursor-pointer"
                        >
                            <UITooltip :tooltip-text="emoji.english">
                                <span @click="selectEmoji(emoji.emoji)">
                                    {{ emoji.emoji }}
                                </span>
                            </UITooltip>
                        </li>
                    </ul>
                </div>
            </div>

            <UIAccordion
                title="Instructions"
                text="Guess the emoji according the dutch adjective!"
            />
        </div>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'
import { adijlist, getEmojis, ResultEmojiList } from '~/content/bijvoemojilijkList'
import { shuffle } from 'lodash'
import GamesSuccess from '~/components/Games/Status/GamesSuccess.vue'

export default Vue.extend({
    data() {
        return {
            words: shuffle(adijlist),
            score: 0,
            wordIndex: 0,
            voice: [] as SpeechSynthesisVoice[],
            success: false,
            lastWord: '',
            pastScore: 0,
            possibleSolutions: [] as ResultEmojiList[],
            lives: 3,
        }
    },
    computed: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        getWord() {
            return this.words[this.wordIndex].dutch
        },
        getTranslation() {
            return this.words[this.wordIndex].english
        },
        getSolution(): string {
            return this.words[this.wordIndex].emoji
        },
    },
    mounted() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices()
            this.voice = voices.filter((d) => d.lang === 'nl-NL')
        }
        this.possibleSolutions = shuffle([this.words[this.wordIndex], ...getEmojis()])
    },
    methods: {
        mixSolutions() {
            return shuffle([this.words[this.wordIndex].emoji, getEmojis()])
        },
        saveScore() {
            this.$store.dispatch('scores/saveScore', {
                game: 'games/bijvoemojilijk',
                score: this.score,
            })
        },
        async increaseWordIndexOrSuccess() {
            if (this.wordIndex + 1 === this.words.length) {
                const score = await this.$store.dispatch(
                    'scores/getScoreByGameAndCurrentUser',
                    'games/bijvoemojilijk'
                )
                this.pastScore = score[0].score ? score[0].score : 0

                this.success = true
            } else {
                this.wordIndex++
            }
        },
        selectEmoji(emoji: string) {
            const solution = this.words[this.wordIndex].emoji
            // guess if the emoji is right
            if (emoji === solution) {
                this.wordIndex++
                this.possibleSolutions = shuffle([this.words[this.wordIndex], ...getEmojis()])
                this.score++
            } else {
                this.lives--
            }
        },
        // bet(betted: number) {
        //     const { emoji } = this.words[this.wordIndex]
        //     if (solution === this.selected) {
        //         this.score++
        //         this.money = this.money + betted * 2
        //         this.isLastGuessCorrect = true
        //         this.lastWord = `👍 ${this.getSolution} ${this.getWord} is correct!`
        //         this.increaseWordIndexOrSuccess()
        //     } else {
        //         this.money = this.money - betted
        //         if (this.money <= 0) {
        //             this.fail = true
        //         } else {
        //             this.isLastGuessCorrect = false
        //             this.lastWord = `👎 ${this.getSolution === 'de' ? 'het' : 'de'} ${
        //                 this.getWord
        //             } is wrong!`
        //             this.increaseWordIndexOrSuccess()
        //         }
        //     }
        // },
        tryAgain() {
            location.reload()
        },
    },
})
</script>
