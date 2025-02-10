<template>
  <div class="flex justify-center flex-col gap-6 items-center">
    <div v-if="firstAnswer === 1" class="text-green-400">Correct!</div>
    <div v-if="firstAnswer === 0" class="text-red-400">Not correct!</div>
    <div v-if="firstAnswer !== -1">
      <GamesDetectiveAutoreveal :delay="2">
        <div class="flex justify-center gap-6 flex-col items-center">
          <p>
            {{ answers.nl }} <br/>
            <small v-if="disableTranslation">{{ answers.en }}</small>
          </p>
          <UIButton @click="$emit('continue', true)">Continue</UIButton>
        </div>
      </GamesDetectiveAutoreveal>
    </div>
  </div>
</template>
<script setup lang="ts">

interface Answers {
  en: string
  nl: string
}


defineProps({
  firstAnswer: Number,
  answers: {
    required: true,
    type: Object as () => Answers
  },
  continue: Function,
  disableTranslation: Boolean
});


</script>
