<template>
    <div class="flex justify-center flex-col gap-6 items-center">
        <GamesDetectiveAutoreveal :delay="1">
            🕵️ Je bent een detective<br />
            <small><em>🕵️ You are a detective</em></small>
        </GamesDetectiveAutoreveal>
        <GamesDetectiveAutoreveal :delay="2">
            <small
                >{{ phrases.nl }} <br />
                {{ phrases.en }}</small
            >
        </GamesDetectiveAutoreveal>
        <GamesDetectiveAutoreveal :delay="3">
            <select
                class="border border-solid border-black dark:text-black p-3 rounded"
                v-model="selection"
            >
                <optgroup :label="questions[0].en" />
                <option>
                    {{ questions[0].nl }}
                </option>
                <option>
                    {{ questions[1].nl }}
                </option>
            </select>
            <UIButton @click="onSelection">Select</UIButton>
            <br />
        </GamesDetectiveAutoreveal>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

interface Phrases {
    en: string
    nl: string
}

type Questions = Phrases[]

export default Vue.extend({
    props: {
        round: Number,
        phrases: Object as () => Phrases,
        questions: Array as () => Questions,
        onSelection: Function,
        selection: String,
    },
    methods: {
        callback: function (e: MouseEvent) {
            //this.$emit('click', e)
            this.onSelection()
        },
    },
})
</script>
