<template>
    <SharedContainer>
        <UITitle orange="Memory" />
        <div class="relative">
            <div
                v-if="success"
                class="flex justify-center items-center absolute top-0 h-full z-10 w-full bg-gray-700/80 backdrop-blur-l flex-col gap-4 round"
            >
                <h2 class="text-3xl md:text-5xl text-bold text-main-orange uppercase text-center">
                    🎉 Gefeliciteerd 🎉
                </h2>
                <p class="text-white">
                    You completed the game in
                    {{ secondsToTime() }} seconds, previous best score was {{ pastScore }} seconds
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="isLogged() && time < pastScore" @click="saveScore">Save</UIButton>
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </div>
            <p class="my-4 dark:text-white">
                Play memory, the game that helps you with your Dutch vocabulary. Turn up your volume
                to hear the Dutch pronunciation
            </p>
            <div class="flex my-4 dark:text-white justify-between">
                <p>
                    Name: <strong>{{ name }}</strong>
                </p>
                <p>Time: {{ secondsToTime() }}</p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <template v-for="memoryCard in memoryCards">
                    <GamesMemoryCard
                        :isCovered="isCovered(memoryCard.id)"
                        :name="memoryCard.name"
                        :image="memoryCard.image"
                        :id="memoryCard.id"
                        @selectCard="selectCard"
                    />
                </template>
            </div>
            <UIAccordion
                title="Instructions"
                text="Select two cards, and match the same ones. Fight against the time!"
            />
        </div>
    </SharedContainer>
</template>
<script setup lang="ts">

import { memoryCardList } from '~/content/memory'
import { shuffler } from '~/utils/memory'
import { speak } from '~/utils/tts'
import { evenOrOdd } from '~/utils/math'

const memoryCards= ref(shuffler(memoryCardList));
const collected= ref([] as { name: string; id: string }[]);
const name= ref('');
const voice= ref([] as SpeechSynthesisVoice[]);
const time= ref(0);
const interval= ref(0);
const success= ref(false);
const pastScore= ref(0);

    onMounted(() => {
        interval.value = counterFunc()
    })
    onUnmounted(() => {
        clearInterval(interval.value);
      window.speechSynthesis.onvoiceschanged = null;
    });

    onMounted( () => {
       window.speechSynthesis.onvoiceschanged = () => {
            const voices =  window.speechSynthesis.getVoices()

            voice.value = voices.filter((d) => d.lang === 'nl-NL')
    }
       });


function secondsToTime() {
  const e = time.value;
  const m = Math.floor((e % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(e % 60).toString().padStart(2, '0')

  return m + ':' + s
}


        function saveScore() {
          return false
        }

        function tryAgain() {
            location.reload()
        }

        function aSecondMore(): void {
            time.value++
        }

        function isLogged() {
          return false
        } 

        function counterFunc(): number {
            return window.setInterval(() => {
                aSecondMore();
            }, 1000)
        }

        function stopTimer() {
            clearInterval(interval.value)
        }

             function flipCardBack() {
            return setTimeout(() => {
                collected.value.splice(collected.value.length - 2, 2)
            }, 800)
        }

        function checkIsCollected(name: string, id: string) {
            collected.value.push({ name, id })

            if (collected.value.length === 8) {
                stopTimer()
                completed()
            }

            if (evenOrOdd(collected.value.length)) {
                //do the check
                if (collected.value.findIndex((c) => c.name === name && c.id !== id) === -1) {
                    flipCardBack()
                }
            }
        }



        function selectCard(cardName: string, id: string) {
            name.value = cardName
            checkIsCollected(cardName, id)
            speak(cardName, voice.value)
        }

      function  isCovered(id: string) {
            return collected.value.findIndex((c) => c.id === id) === -1
        }

        async function completed() {
            //TODO: save the score
            // if (isLogged()) {
            //     const score = await this.$store.dispatch(
            //         'scores/getScoreByGameAndCurrentUser',
            //         'games/memory'
            //     )
            //     this.pastScore = score[0].score ? score[0].score : 0
            // }
            return setTimeout(() => {
                success.value = true
            }, 600)}

</script>
