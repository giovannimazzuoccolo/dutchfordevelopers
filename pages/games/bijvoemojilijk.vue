<template>
    <Container>
        <UITitle orange="De or" blue="(B)het" />
        <div class="relative">
            <GamesSuccess v-if="endgame">
                <p class="text-white">
                    You guessed {{ score }} emojis! Your best score is {{ pastScore }} emojis
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="isLogged && score > pastScore" @click="saveScore"
                        >Save</UIButton
                    >
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </GamesSuccess>
            <GamesOver v-if="fail">
                <p class="text-white">Oh no, no emoji guessed 😔, Jammer!</p>
                <div class="flex gap-4">
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </GamesOver>

            <p class="my-4 dark:text-white">Play bijvoemojilijk, how many emojis you can guess?</p>
            <div class="flex my-4 dark:text-white justify-between">
                <p>Score: {{ score }}</p>
                <p>Lives: <span v-for="i in lives" :key="i">❤️</span></p>
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
            endgame: false,
            fail: false,
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
        saveScore() {
            this.$store.dispatch('scores/saveScore', {
                game: 'games/bijvoemojilijk',
                score: this.score,
            })
        },
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        async increaseWordIndexOrSuccess() {
            if (this.wordIndex + 1 === this.words.length) {
                if (this.isLogged()) {
                    const score = await this.$store.dispatch(
                        'scores/getScoreByGameAndCurrentUser',
                        'games/bijvoemojilijk'
                    )

                    this.pastScore = score[0].score ? score[0].score : 0
                }
                this.endgame = true
            } else {
                this.wordIndex++
            }
        },
        selectEmoji(emoji: string) {
            const solution = this.words[this.wordIndex].emoji
            // guess if the emoji is right
            if (emoji === solution) {
                this.increaseWordIndexOrSuccess()
                this.possibleSolutions = shuffle([this.words[this.wordIndex], ...getEmojis()])
                this.score++
            } else {
                if (this.lives === 0) {
                    if (this.score === 0) {
                        this.fail = true
                    } else {
                        this.endgame = true
                    }
                } else {
                    this.lives--
                }
            }
        },
        tryAgain() {
            location.reload()
        },
    },
})
</script>
