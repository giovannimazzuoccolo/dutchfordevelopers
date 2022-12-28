<template>
    <Container>
        <UITitle orange="De" blue="Detective" />
        <div class="relative">
            <div
                v-if="success"
                class="flex justify-center items-center absolute top-0 h-full z-10 w-full bg-gray-700/80 backdrop-blur-l flex-col gap-4 round"
            >
                <h2 class="text-3xl md:text-5xl text-bold text-main-orange uppercase text-center">
                    🎉 Gefeliciteerd 🎉
                </h2>
                <p class="text-white">
                    You selected
                    {{ sentences }} corrected sentences, the previous best score was
                    {{ pastScore }} sentences!
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="isLogged && sentences < pastScore" @click="saveScore"
                        >Save</UIButton
                    >
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </div>
            <p class="my-4 dark:text-white">
                Be a detective! Discover who stole the Queen's crown. Be careful! Use the stressed
                form only when you are sure about the culprit.
            </p>
            <div class="flex my-4 dark:text-white justify-between">
                <p>
                    Correct sentences:
                    <strong>{{ sentences }}</strong>
                </p>
                <UILink>Disable English translations</UILink>
            </div>
            <div class="flex justify-center flex-col gap-6 items-center">
                <Autoreveal :delay="1">
                    🕵️ Je bent een detective<br />
                    <small><em>🕵️ You are a detective</em></small>
                </Autoreveal>
                <Autoreveal :delay="stepper + 2">
                    <small
                        >{{ returnPhrase().nl }} <br />
                        {{ returnPhrase().en }}</small
                    >
                </Autoreveal>
                <Autoreveal :delay="stepper + 3">
                    <select class="dark:text-black p-3 rounded" v-model="selection">
                        <optgroup :label="returnPhrase().questions[0].en" />
                        <option>
                            {{ returnPhrase().questions[0].nl }}
                        </option>
                        <option>
                            {{ returnPhrase().questions[1].nl }}
                        </option>
                    </select>
                    <UIButton @click="checkSelection()">Select</UIButton>
                    <br />
                </Autoreveal>
                <div v-if="lastAnswer === 1" class="text-green-400">Correct!</div>
                <div v-if="lastAnswer === 0" class="text-red-400">Not correct!</div>
                <div v-if="lastAnswer !== -1">
                    <Autoreveal :delay="1">
                        {{ returnPhrase().answer?.nl }}<br />
                        <small
                            ><em>{{ returnPhrase().answer?.en }}</em></small
                        >
                    </Autoreveal>
                </div>
            </div>
            <UIAccordion
                title="Instructions"
                text="Select which question you want to ask. Be formal with the Queen!"
            />
        </div>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'
import Autoreveal from '~/components/Games/Detective/Autoreveal.vue'
import { route1 } from '~/content/detective'
export default Vue.extend({
    data() {
        return {
            sentences: 0,
            success: false,
            pastScore: 0,
            stepper: 0,
            selection: '',
            lastAnswer: -1,
        }
    },
    computed: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
    },
    created() {},
    beforeDestroy() {},
    mounted() {},
    methods: {
        async completed() {
            const score = await this.$store.dispatch(
                'scores/getScoreByGameAndCurrentUser',
                'games/detective'
            )
        },
        saveScore() {
            this.$store.dispatch('scores/saveScore', {
                game: 'games/detective',
                score: this.sentences,
            })
        },
        nextStep() {
            this.stepper++
        },
        returnPhrase() {
            return route1[this.stepper]
        },
        tryAgain() {
            location.reload()
        },
        checkSelection() {
            console.log(this.selection)
            if (this.returnPhrase().solution === this.selection) {
                this.lastAnswer = 1
            } else {
                this.lastAnswer = 0
            }
        },
    },
    components: { Autoreveal },
})
</script>
