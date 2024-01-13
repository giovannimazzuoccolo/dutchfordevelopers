<template>
  <Container>
    <UITitle orange="Passport" blue="Control"/>
    <div class="relative">
      <GamesSuccess v-if="success">
        <p class="text-white">
          You guessed {{ score }} verbs! Your best score is {{ pastScore }} verbs
        </p>
        <div class="flex gap-4">
          <UIButton v-if="isLogged && score > pastScore" @click="saveScore"
          >Save
          </UIButton
          >
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </GamesSuccess>

      <GamesOver v-if="fail">
        <p class="text-white">The queue is too long, you lose 😔</p>
        <div class="flex gap-4">
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </GamesOver>

      <p class="my-4 dark:text-white">
        Play passport control, put the verbs in the right queue and keep the line as short
        as possible
      </p>
      <div class="flex my-4 dark:text-white justify-between">
        <p>
          Verbs in line: <strong>{{ line }}</strong>
        </p>
        <p>Score: {{ score }}</p>
      </div>

      <div class="flex gap-3 flex-col justify-between md:flex-row">
        <div class="flex justify-center items-center gap-4 flex-col md:w-full">
          <PassportCover :verb="getWord"/>
          <p class="dark:text-white italic">({{ getTranslation }})</p>
        </div>

        <div class="flex justify-center gap-4 flex-col md:w-full md:p-12">
          <h2 class="dark:text-white">Queue</h2>
          <div class="mb-2">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                for="person"
            >
              Person
            </label>
            <select
                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Person"
                v-model="person"
            >
              <option value="first_singular">First singular</option>
              <option value="second_singular">Second singular</option>
              <option value="third_singular">Third singular</option>
              <option value="first_plural">First plural</option>
              <option value="second_plural">Second plural</option>
              <option value="third_plural">Third plural</option>
            </select>
          </div>
          <div class="mb-2">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                for="form"
            >
              Form
            </label>
            <select
                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="form"
                v-model="form"
            >
              <option value="present">Present</option>
              <option value="past_participle">Past participle</option>
              <option value="past">Past</option>
              <option value="future">Future</option>
            </select>
          </div>
          <div class="mb-2">
            <div>
              <div class="form-check mb-1">
                <p
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-slate-400"
                >
                  Regular or irregular?
                </p>
                <input
                    class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="regularOrIrregular"
                    id="regularRadio"
                    value="regular"
                    v-model="regularOrIrregular"
                />
                <label
                    class="form-check-label inline-block text-gray-800 dark:text-gray-100"
                    for="regularRadio"
                >
                  Regular
                </label>
              </div>
              <div class="form-check">
                <input
                    class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="regularOrIrregular"
                    id="irregularRadio"
                    value="irregular"
                    v-model="regularOrIrregular"
                />
                <label
                    class="form-check-label inline-block text-gray-800 dark:text-gray-100"
                    for="irregularRadio"
                >
                  Irregular
                </label>
              </div>
            </div>
          </div>
          <UIButton @click="confirmChoice">Confirm</UIButton>
          <div :class="isLastGuessCorrect ? 'text-green-400' : 'text-red-400'">
            {{ lastWord }}
          </div>
        </div>
      </div>
      <UIAccordion
          title="Instructions"
          text="Select the right verb form to gain points. If you make a mistake, a new element goes to the queue. If the line reaches 10 verbs you lost."
      />
    </div>
  </Container>
</template>
<script setup lang="ts">
import {TENSE, PERSON, REGULAR_IRREGULAR, wordList} from '~/content/passport'
import _ from 'lodash'
import GamesSuccess from '~/components/Games/Status/GamesSuccess.vue'
import GamesOver from '~/components/Games/Status/GamesOver.vue'
import PassportCover from '~/components/Games/Passport/PassportCover.vue'


const form = ref(TENSE.PRESENT);
const person = ref(PERSON.FIRST_SINGULAR);
const regularOrIrregular = ref(true);
const line = ref(1);
const words = ref(_.shuffle(wordList));
const score = ref(0);
const wordIndex = ref(0);
const voice = ref([] as SpeechSynthesisVoice[]);
const success = ref(false);
const fail = ref(false);
const lastWord = ref('');
const isLastGuessCorrect = ref(false);
const pastScore = ref(0);

const getWord = computed(() => words.value[wordIndex.value].verb);

const isLogged = () => false;

const getTranslation = computed(() => words.value[wordIndex.value].translation);


onMounted(() => {
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices()
    voice.value = voices.filter((d) => d.lang === 'nl-NL')
  }
});

function saveScore() {
  // $store.dispatch('scores/saveScore', {
  //   game: 'games/passport',
  //   score: score.value,
  // })
}

async function increaseWordIndexOrSuccess() {
  if (wordIndex.value + 1 === words.value.length) {
    // const score = await this.$store.dispatch(
    //     'scores/getScoreByGameAndCurrentUser',
    //     'games/passport'
    // )
    //pastScore = score[0].score ? score[0].score : 0
    success.value = true
  } else {
    wordIndex.value++
  }
}

function getSolution() {
  return {
    form: words.value[wordIndex.value].tense,
    person: words.value[wordIndex.value].person,
    regularOrIrregular: words.value[wordIndex.value].regular,
  }
}

function tryAgain() {
  location.reload()
}

function goNext() {
  if (wordIndex.value + 1 === words.value.length) {
    success.value = true
  } else {
    wordIndex.value++
  }
};

function confirmChoice() {
  const {form: solutionForm, person: solutionPerson, regularOrIrregular} = getSolution()

  if (solutionForm === form.value && solutionPerson === person.value) {
    score.value++
    lastWord.value = ` ${words.value[wordIndex.value].verb} is correct! 👍`
    isLastGuessCorrect.value = true
    goNext()
  } else {
    line.value++
    lastWord.value = ` ${words.value[wordIndex.value].verb} is wrong! 👎`
    isLastGuessCorrect.value = false
    if (line.value === 10) {
      fail.value = true
    }
    goNext()
  }
}
</script>
