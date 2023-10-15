<template>
  <div class="flex justify-center flex-col gap-6 items-center">
    <GamesDetectiveAutoreveal :delay="1 + round">
      🕵️ Je bent een detective<br/>
      <span v-if="disableTranslation">
                <small> <em>🕵️ You are a detective</em></small></span
      >
    </GamesDetectiveAutoreveal>
    <GamesDetectiveAutoreveal :delay="2 + round">
      <small
      >{{ phrases.nl }} <br/>
        <span v-if="disableTranslation"> {{ phrases.en }}</span></small
      >
    </GamesDetectiveAutoreveal>
    <GamesDetectiveAutoreveal :delay="3 + round">
      <select
          class="border border-solid border-black dark:text-black p-3 rounded"
          v-model="selection"
      >
        <optgroup :label="questions[0].en"/>
        <option>
          {{ questions[0].nl }}
        </option>
        <option>
          {{ questions[1].nl }}
        </option>
      </select>
      <UIButton @click="$emit('onSelection', selection.value)">Select</UIButton>
      <br/>
    </GamesDetectiveAutoreveal>
  </div>
</template>
<script setup lang="ts">
import Vue from 'vue'

interface Phrases {
  en: string
  nl: string
}

type Questions = Phrases[]

const selection = ref('')

const props = defineProps({
  round: Number,
  phrases: {
    required: true,
    type: Object as () => Phrases
  },
  questions: {
    required: true,
    type: Object as () => Questions,
  },
  onSelection: Function,
  disableTranslation: {
    required: true,
    type: Boolean
  }
});

</script>
