<template>
  <SharedContainer>
    <UITitle orange="De" blue="Detective"/>
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
          <UIButton v-if="isLogged && sentences > pastScore" @click="saveScore"
          >Save
          </UIButton>
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </div>
      <p class="my-4 dark:text-white">
        Be a detective! Discover who stole the Queen's crown. Be careful! Use the stressed
        form only when you are sure about the culprit. (2 rounds)
      </p>
      <div class="flex my-4 dark:text-white justify-between cursor-pointer hover:underline">
        <p>
          Correct sentences:
          <strong>{{ sentences }}</strong>
        </p>
        <p v-if="!disableTranslations" @click="triggerTranslations">
          Disable English translations
        </p>
        <p v-if="disableTranslations" @click="triggerTranslations">
          Enable English Translations
        </p>
      </div>
      <QuestionBlock
          :round="stepper"
          :phrases="text[stepper].intro"
          :questions="text[stepper].questions"
          @onSelection="checkSelection"
          :disableTranslation="!disableTranslations"
      />
      <AnswerFeedback
          :firstAnswer="firstAnswer"
          :answers="returnPhrase().answer"
          @continue="nextStep"
      />
    </div>
    <UIAccordion
        title="Instructions"
        text="Select which question you want to ask. Be formal with the Queen!"
    />
  </SharedContainer>
</template>
<script setup lang="ts">
import AnswerFeedback from '~/components/Games/Detective/AnswerFeedback.vue'
import Autoreveal from '~/components/Games/Detective/Autoreveal.vue'
import QuestionBlock from '~/components/Games/Detective/QuestionBlock.vue'
import {Phrases, route1} from '~/content/detective'

const text = ref<Phrases>(route1);
const sentences = ref<number>(0)
const success = ref<boolean>(false)
const pastScore = ref<number>(0)
const stepper = ref<number>(0)
const selection = ref<string>('')
const firstAnswer = ref<number>(-1);
const disableTranslations = ref<boolean>(false);

function nextStep() {
  if (stepper.value === 3) {
    success.value = true;
  } else {
    stepper.value++;
    firstAnswer.value = -1 //resetting the answers
  }
}

function returnPhrase() {
  return route1[stepper.value]
}

function tryAgain() {
  window.location.reload() // find a better way to reset the state
}

function checkSelection() {
  if (returnPhrase().solution === selection.value) {
    firstAnswer.value = 1
    sentences.value++
  } else {
    firstAnswer.value = 0
  }
}

function triggerTranslations() {
  const actualTranslations = disableTranslations.value
  disableTranslations.value = !actualTranslations
}

function isLogged() {
  return false;
}

function saveScore() {
  return false;
}

// export default Vue.extend({
//     data() {
//         return {
//             text: route1,
//             sentences: 0,
//             success: false,
//             pastScore: 0,
//             stepper: 0,
//             selection: '',
//             firstAnswer: -1,
//             disableTranslations: false,
//         }
//     },
//     computed: {
//         isLogged() {
//             return this.$store.getters['user/isLogged']
//         },
//     },
//     methods: {
//         async completed() {
//             const score = await this.$store.dispatch(
//                 'scores/getScoreByGameAndCurrentUser',
//                 'games/detective'
//             )
//         },
//         saveScore() {
//             this.$store.dispatch('scores/saveScore', {
//                 game: 'games/detective',
//                 score: this.sentences,
//             })
//         },
//         nextStep() {
//             if (this.stepper === 3) {
//                 this.success = true
//             } else {
//                 this.stepper++
//                 this.firstAnswer = -1 //resetting the answer
//             }
//         },
//         returnPhrase() {
//             return route1[this.stepper]
//         },
//         tryAgain() {
//             location.reload()
//         },
//         checkSelection(selection: string) {
//             if (this.returnPhrase().solution === selection) {
//                 this.firstAnswer = 1
//                 this.sentences++
//             } else {
//                 this.firstAnswer = 0
//             }
//         },
//         triggerTranslations() {
//             const actualTranslations = this.disableTranslations
//             this.disableTranslations = !actualTranslations
//         },
//     },
//     components: { Autoreveal, QuestionBlock, AnswerFeedback },
// })
</script>
