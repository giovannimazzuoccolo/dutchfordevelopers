<template>
    <Container>
        <UITitle orange="Memory" />
        <div class="relative">
            <div
                v-if="success"
                class="flex justify-center items-center absolute top-0 h-full z-10 w-full bg-gray-700/80 backdrop-blur-l flex-col gap-4 round"
            >
                <h2
                    class="text-5xl text-bold text-main-orange uppercase"
                >
                    Gefeliciteerd 🎉🎉🎉
                </h2>
                <p class="text-white">
                    You completed the game in
                    {{ secondsToTime }} seconds
                </p>
                <div class="flex gap-4">
                    <UIButton>Save</UIButton>
                    <UIButton @click="tryAgain"
                        >Try again</UIButton
                    >
                </div>
            </div>
            <p class="my-4 dark:text-white">
                Play memory, the game that helps you with
                your Dutch vocabulary. Turn up your volume
                to hear the Dutch pronunciation
            </p>
            <div
                class="flex my-4 dark:text-white justify-between"
            >
                <p>
                    Name: <strong>{{ name }}</strong>
                </p>
                <p>Time: {{ secondsToTime }}</p>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <template v-for="memoryCard in memoryCards">
                    <GamesMemoryCard
                        :isCovered="
                            isCovered(memoryCard.id)
                        "
                        :name="memoryCard.name"
                        :image="memoryCard.image"
                        :id="memoryCard.id"
                        @selectCard="selectCard"
                    />
                </template>
            </div>
            <UIAccordion
                title="Instructions"
                text="Select two cards, and match the same ones. Fight against the time!"
            />
        </div>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'
import { memoryCardList } from '~/content/memory'
import { shuffler } from '~/utils/memory'
import { speak } from '~/utils/tts'
import { evenOrOdd } from '~/utils/math'

export default Vue.extend({
    data() {
        return {
            memoryCards: shuffler(memoryCardList),
            collected: [] as { name: string; id: string }[],
            name: '',
            voice: [] as SpeechSynthesisVoice[],
            time: 0,
            interval: 0,
            success: false,
        }
    },

    computed: {
        secondsToTime() {
            const e = this.time
            const m = Math.floor((e % 3600) / 60)
                    .toString()
                    .padStart(2, '0'),
                s = Math.floor(e % 60)
                    .toString()
                    .padStart(2, '0')

            return m + ':' + s
        },
    },

    created() {
        this.interval = this.counterFunc()
    },
    beforeDestroy() {
        clearInterval(this.interval)
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
        tryAgain() {
            location.reload()
        },

        aSecondMore(): void {
            this.time++
        },

        counterFunc(): number {
            return window.setInterval(() => {
                this.aSecondMore()
            }, 1000)
        },

        stopTimer() {
            clearInterval(this.interval)
        },

        checkIsCollected(name: string, id: string) {
            this.collected.push({ name, id })

            if (this.collected.length === 8) {
                this.stopTimer()
                this.completed()
            }

            if (evenOrOdd(this.collected.length)) {
                //do the check
                if (
                    this.collected.findIndex(
                        (c) =>
                            c.name === name && c.id !== id
                    ) === -1
                ) {
                    this.flipCardBack()
                }
            }
        },

        flipCardBack() {
            return setTimeout(() => {
                this.collected.splice(
                    this.collected.length - 2,
                    2
                )
            }, 800)
        },

        selectCard(name: string, id: string) {
            this.name = name
            this.checkIsCollected(name, id)
            speak(name, this.voice)
        },

        isCovered(id: string) {
            return (
                this.collected.findIndex(
                    (c) => c.id === id
                ) === -1
            )
        },

        completed() {
            return setTimeout(() => {
                this.success = true
            }, 1000)
        },
    },
})
</script>
