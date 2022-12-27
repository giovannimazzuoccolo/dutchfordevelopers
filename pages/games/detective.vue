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
                    You solved
                    {{ cases }}, the previous best score was {{ pastScore }} cases!
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="isLogged && cases < pastScore" @click="saveScore"
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
                    Cases solved:
                    <strong>{{ cases }}</strong>
                </p>
                <UILink>Disable English translations</UILink>
            </div>
            <div class="flex justify-center flex-col gap-6 items-center">
                <Autoreveal delay="1">
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
                    <select>
                        <optgroup :label="returnPhrase().questions[0].en" />
                        <option>
                            {{ returnPhrase().questions[0].nl }}
                        </option>
                        <option>
                            {{ returnPhrase().questions[1].nl }}
                        </option>
                    </select>
                    <UIButton>Select</UIButton>
                    <br />
                </Autoreveal>
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
            cases: 0,
            success: false,
            pastScore: 0,
            stepper: 0,
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
                score: this.cases,
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
    },
    components: { Autoreveal },
})
</script>
