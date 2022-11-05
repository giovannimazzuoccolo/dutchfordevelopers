<template>
    <Container>
        <UITitle orange="Memory" />
        <p class="my-4 dark:text-white">
            Play memory, the game that helps you with your
            Dutch vocabulary. Turn up your volume to hear
            the Dutch pronunciation
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
                    :isCovered="isCovered(memoryCard.id)"
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
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'
import { memoryCardList } from '~/content/memory'
import { shuffler } from '~/utils/memory'

export default Vue.extend({
    data() {
        return {
            memoryCards: shuffler(memoryCardList),
            collected: [],
            selection: '',
            name: '',
            voice: [] as SpeechSynthesisVoice[],
            time: 0,
            interval: 0,
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
        aSecondMore(): void {
            this.time++
        },

        counterFunc(): number {
            return window.setInterval(() => {
                this.aSecondMore()
            }, 1000)
        },
        selectCard(name: string, id: string) {
            this.selection = id
            this.name = name
            let speak = new SpeechSynthesisUtterance(name)
            speak.voice = this.voice[0]
            speak.rate = 0.7
            window.speechSynthesis.speak(speak)
        },
        isCovered(id: string) {
            return !(id === this.selection)
        },
    },
})
</script>
