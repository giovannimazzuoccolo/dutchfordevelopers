<template>
    <div class="flex justify-center flex-col gap-6 items-center">
        <GamesDetectiveAutoreveal :delay="1 + round">
            🕵️ Je bent een detective<br />
            <small><em>🕵️ You are a detective</em></small>
        </GamesDetectiveAutoreveal>
        <GamesDetectiveAutoreveal :delay="2 + round">
            <small
                >{{ phrases.nl }} <br />
                {{ phrases.en }}</small
            >
        </GamesDetectiveAutoreveal>
        <GamesDetectiveAutoreveal :delay="3 + round">
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
            <UIButton @click="callback">Select</UIButton>
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
    },
    methods: {
        callback: function (e: MouseEvent) {
            //this.$emit('click', e)
            this.$emit('onSelection', this.selection)
        },
    },
    data() {
        return { selection: '' }
    },
})
</script>
