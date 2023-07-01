<template>
    <div class="flex justify-center flex-col gap-6 items-center">
        <div v-if="firstAnswer === 1" class="text-green-400">Correct!</div>
        <div v-if="firstAnswer === 0" class="text-red-400">Not correct!</div>
        <div v-if="firstAnswer !== -1">
            <GamesDetectiveAutoreveal :delay="2">
                <div class="flex justify-center gap-6 flex-col items-center">
                    <p>
                        {{ answers.nl }} <br />
                        <small>{{ answers.en }}</small>
                    </p>
                    <UIButton @click="callback">Continue</UIButton>
                </div>
            </GamesDetectiveAutoreveal>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

interface Answers {
    en: string
    nl: string
}

export default Vue.extend({
    props: {
        firstAnswer: Number,
        answers: Object as () => Answers,
        continue: Function,
    },
    methods: {
        callback: function () {
            this.$emit('continue', true)
        },
    },
})
</script>
