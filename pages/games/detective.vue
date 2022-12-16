<template>
    <Container>
        <UITitle orange="De" blue="Detective" />
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
                    You solved
                    {{ cases }}, the previous best score was
                    {{ pastScore }} cases!
                </p>
                <div class="flex gap-4">
                    <UIButton
                        v-if="isLogged && cases < pastScore"
                        @click="saveScore"
                        >Save</UIButton
                    >
                    <UIButton @click="tryAgain"
                        >Try again</UIButton
                    >
                </div>
            </div>
            <p class="my-4 dark:text-white">
                Be a detective! Discover who stole the
                Queen's crown. Be careful! Use the stressed
                form only when you are sure about the
                culprit.
            </p>
            <div
                class="flex my-4 dark:text-white justify-between"
            >
                <p>
                    Cases solved:
                    <strong>{{ cases }}</strong>
                </p>
                <UILink
                    >Disable English translations</UILink
                >
            </div>
            <div class="flex justify-center">
                <Autoreveal>
                    🕵️ Je bent een detective
                    <small>You are a detective</small>
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
export default Vue.extend({
    data() {
        return {
            cases: 0,
            success: false,
            pastScore: 0,
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
        tryAgain() {
            location.reload()
        },
    },
    components: { Autoreveal },
})
</script>
