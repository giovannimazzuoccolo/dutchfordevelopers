<template>
  <Container>
    <UITitle orange="De or" blue="(B)het"/>
    <div class="relative">
      <GamesSuccess v-if="success">
        <p class="text-white">
          You guessed {{ score }} words! Your best score is {{ pastScore }} words
        </p>
        <div class="flex gap-4">
          <UIButton v-if="isLogged() && score > pastScore" @click="saveScore"
          >Save
          </UIButton
          >
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </GamesSuccess>

      <GamesOver v-if="fail">
        <p class="text-white">You lost all the guilder</p>
        <div class="flex gap-4">
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </GamesOver>

      <p class="my-4 dark:text-white">
        Play "De or (b)het", guess if the word is a de or an het word, do your bet and don't
        lose your fake guilder!
      </p>
      <div class="flex my-4 dark:text-white justify-between">
        <p>
          Guilder: <strong>{{ money }} G</strong>
        </p>
        <p>Score: {{ score }}</p>
      </div>

      <div class="p-16 flex justify-center items-center gap-4 flex-col">
        <div>
          <select v-model="selected" class="text-4xl rounded">
            <option value="de">De</option>
            <option value="het">Het</option>
          </select>
          <span class="text-4xl dark:text-white">{{ getWord }}</span>
        </div>
        <div :class="isLastGuessCorrect ? 'text-green-400' : 'text-red-400'">
          {{ lastWord }}
        </div>
      </div>

      <div class="p-16 flex justify-center items-center gap-4">
        <UIButton @click="bet(50)" :disabled="money < 50">Bet 50G</UIButton>
        <UIButton @click="bet(100)" :disabled="money < 100">Bet 100G</UIButton>
        <UIButton @click="bet(500)" :disabled="money < 500">Bet 500G</UIButton>
      </div>

      <UIAccordion
          title="Instructions"
          text="Select from the dropdown 'De' or 'Het', and make your bet! If you win you receive your bet doubled!"
      />
    </div>
  </Container>
</template>
<script setup lang="ts">
import Vue from 'vue'
import {wordList} from '~/content/deofhet'
import _ from 'lodash'
import GamesSuccess from '~/components/Games/Status/GamesSuccess.vue'
import GamesOver from '~/components/Games/Status/GamesOver.vue'

const selected = ref('de')
const money = ref(1000)
const words = ref(_.shuffle(wordList))
const score = ref(0)
const wordIndex = ref(0)
const voice = ref([] as SpeechSynthesisVoice[])
const success = ref(false)
const fail = ref(false)
const lastWord = ref('')
const isLastGuessCorrect = ref(false)
const pastScore = ref(0)


const getWord = computed(() => words.value[wordIndex.value].word)
const getSolution = computed(() => words.value[wordIndex.value].solution)


onMounted(() => {
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices()
    voice.value = voices.filter((d) => d.lang === 'nl-NL')
  }
});

function saveScore() {
  // this.$store.dispatch('scores/saveScore', {
  //     game: 'games/deofhet',
  //     score: this.score,
  // })
}

function isLogged() {
  return false
  //return this.$store.getters['user/isLogged']
};

async function increaseWordIndexOrSuccess() {
  if (wordIndex.value + 1 === words.value.length) {
    if (isLogged()) {
      // const score = await this.$store.dispatch(
      //     'scores/getScoreByGameAndCurrentUser',
      //     'games/deofhet'
      // )
      // pastScore.value = score[0].score ? score[0].score : 0
    }
    success.value = true;
  } else {
    wordIndex.value++;
  }
}

function bet(bet: number) {
  const {solution} = words.value[wordIndex.value];
  if (solution === selected.value) {
    score.value++
    money.value = money.value + bet * 2
    isLastGuessCorrect.value = true
    lastWord.value = `👍 ${getSolution.value} ${getWord.value} is correct!`
    increaseWordIndexOrSuccess()
  } else {
    money.value = money.value - bet
    if (money.value <= 0) {
      fail.value = true
    } else {
      isLastGuessCorrect.value = false
      lastWord.value = `👎 ${getSolution.value === 'de' ? 'het' : 'de'} ${
          getWord.value
      } is wrong!`
      increaseWordIndexOrSuccess()
    }
  }
}

function tryAgain() {
  location.reload()
}

</script>
