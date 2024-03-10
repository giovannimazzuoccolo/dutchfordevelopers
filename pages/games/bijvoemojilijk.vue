<template>
  <SharedContainer>
    <UITitle orange="Bijvoemojilijk" />
    <div class="relative">
      <GamesStatusGamesSuccess v-if="endgame">
        <p class="text-white">
          You guessed {{ score }} emojis! Your best score is {{ pastScore }} emojis
        </p>
        <div class="flex gap-4">
          <UIButton v-if="isLogged() && score > pastScore" @click="saveScore"
          >Save
          </UIButton
          >
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </GamesStatusGamesSuccess>
      <GamesStatusGamesOver v-if="fail">
        <p class="text-white">Oh no, no emoji guessed 😔, Jammer!</p>
        <div class="flex gap-4">
          <UIButton @click="tryAgain">Try again</UIButton>
        </div>
      </GamesStatusGamesOver>

      <p class="my-4 dark:text-white">Play bijvoemojilijk, how many emojis you can guess?</p>
      <div class="flex my-4 dark:text-white justify-between">
        <p>Score: {{ score }}</p>
        <p>Lives: <span v-for="i in lives" :key="i">❤️</span></p>
      </div>

      <div class="p-16 flex justify-center items-center gap-4 flex-col">
        <div>
          <span class="text-4xl dark:text-white">{{ getWord }}</span>
        </div>

        <div class="p-16 flex justify-center items-center gap-4 text-5xl">
          <ul class="flex gap-5">
            <li
                v-for="emoji in possibleSolutions"
                :key="emoji.english"
                class="cursor-pointer"
            >
              <UITooltip :tooltip-text="emoji.english">
                                <span @click="selectEmoji(emoji.emoji)">
                                    {{ emoji.emoji }}
                                </span>
              </UITooltip>
            </li>
          </ul>
        </div>
      </div>

      <UIAccordion
          title="Instructions"
          text="Guess the emoji according the dutch adjective!"
      />
    </div>
  </SharedContainer>
</template>
<script setup lang="ts">
import {adijlist, getEmojis, type ResultEmojiList} from '~/content/bijvoemojilijkList'
import { shuffle } from 'lodash'
import { useScores } from '~/store/scores';
import { storeToRefs } from 'pinia';
import { useUsers } from '~/store/users';
const uScores = useScores();

const { getScoreByGameAndCurrentUser } = uScores;
const { scores } = storeToRefs(uScores);
const { isLogged } = useUsers();



const words = ref(shuffle(adijlist))
const score = ref(0)
const wordIndex = ref(0)
const voice = ref([] as SpeechSynthesisVoice[])
const endgame = ref(false)
const fail = ref(false)
const lastWord = ref('')
const pastScore = ref(0)
const hasPastScore = ref(false);
const isSaved = ref(false);
const possibleSolutions = ref([] as ResultEmojiList[])
const lives = ref(3);


const getWord = computed(() => words.value[wordIndex.value].dutch);

const getTranslation = computed(() => words.value[wordIndex.value].english);

const getSolution = computed(() => words.value[wordIndex.value].emoji);


onMounted(() => {
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices()
    voice.value = voices.filter((d) => d.lang === 'nl-NL')
  }
});

onMounted(() => possibleSolutions.value = shuffle([words.value[wordIndex.value], ...getEmojis()]));



function saveScore() {
  if (!isLogged()) return;

  const updateOrInsert = hasPastScore.value ? "UPDATE" : "INSERT";

  uScores.saveScore("games/bijvoemojilijk", score.value, updateOrInsert);
  isSaved.value = true;
}

async function increaseWordIndexOrSuccess() {
  if (wordIndex.value + 1 === words.value.length) {
    if (isLogged()) {
     
       await getScoreByGameAndCurrentUser("games/bijvoemojilijk");
      if (score) {
        pastScore.value = Number(scores.value[0].score);
        hasPastScore.value = true;
      }
    }
    endgame.value = true
  } else {
    wordIndex.value++
  }
}


function selectEmoji(emoji: string) {
  const solution = words.value[wordIndex.value].emoji
  // guess if the emoji is right
  if (emoji === solution) {
    increaseWordIndexOrSuccess()
    possibleSolutions.value = shuffle([words.value[wordIndex.value], ...getEmojis()])
    score.value++
  } else {
    if (lives.value === 0) {
      if (score.value === 0) {
        fail.value = true
      } else {
        endgame.value = true
      }
    } else {
      lives.value--
    }
  }
}

function tryAgain() {
  location.reload()
}

</script>
