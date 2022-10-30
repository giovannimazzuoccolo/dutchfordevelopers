<template>
    <Container>
        <UITitle orange="Memory" />
        <p class="my-4">
            Play memory, the game that helps you with your
            Dutch vocabulary. Turn up your volume to hear
            the Dutch pronunciation
        </p>

        <div class="grid grid-cols-4 gap-4">
            <template v-for="memoryCard in memoryCards">
                <GamesMemoryCard
                    :isCovered="true"
                    :name="memoryCard.name"
                    :image="memoryCard.image"
                    :id="memoryCard.id"
                    @selectCard="selectCard"
                />
            </template>
        </div>
        <UIAccordion
            title="Instructions"
            text="Select two cards, get a point if you match the same ones"
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
            voice: [] as SpeechSynthesisVoice[],
        }
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
        isCovered() {},
        selectCard(name: string, id: string) {
            this.selection = id

            let speak = new SpeechSynthesisUtterance(name)
            speak.voice = this.voice[0]
            speak.rate = 0.7
            window.speechSynthesis.speak(speak)
        },
    },
})
</script>
