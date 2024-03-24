<template>
    <SharedContainer>
        <UITitle orange="De" blue="Detective" />
        <div class="relative">
            <div v-if="success"
                class="flex justify-center items-center absolute top-0 h-full z-10 w-full bg-gray-700/80 backdrop-blur-l flex-col gap-4 round">
                <h2 class="text-3xl md:text-5xl text-bold text-main-orange uppercase text-center">
                    🎉 Gefeliciteerd 🎉
                </h2>
                <p class="text-white">
                    You selected
                    {{ correctSentences }} corrected sentences, the previous best score was
                    {{ pastScore }} sentences!
                </p>
                <div class="flex gap-4">
                    <UIButton v-if="checkIfScoreIsBetter()" @click="saveScore">Save
                    </UIButton>
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
            </div>
            <p class="my-4 dark:text-white">
                Be a detective! Discover who stole the Queen's crown. Be careful! Use
                the stressed form only when you are sure about the culprit. (2 rounds)
            </p>
            <div class="flex my-4 dark:text-white justify-between">
                <p>
                    Correct sentences:
                    <strong>{{ correctSentences }}</strong>
                </p>
                <p v-if="!disableTranslations" @click="triggerTranslations" class="cursor-pointer hover:underline">
                    Disable English translations
                </p>
                <p v-if="disableTranslations" @click="triggerTranslations" class="cursor-pointer hover:underline">
                    Enable English Translations
                </p>
            </div>
            <QuestionBlock :round="stepper" :phrases="text[stepper].intro" :questions="text[stepper].questions"
                @onSelection="checkSelection" :disableTranslation="!disableTranslations" />
            <AnswerFeedback :firstAnswer="firstAnswer" :answers="returnPhrase().answer" @continue="nextStep" />
        </div>
        <UIAccordion title="Instructions" text="Select which question you want to ask. Be formal with the Queen!" />
    </SharedContainer>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import AnswerFeedback from "~/components/Games/Detective/AnswerFeedback.vue";
import QuestionBlock from "~/components/Games/Detective/QuestionBlock.vue";
import { type Phrases, route1 } from "~/content/detective";
import { useScores } from "~/store/scores";
import { useUsers } from "~/store/users";


const uScores = useScores();
const { scores } = storeToRefs(uScores);

const { getScoreByGameAndCurrentUser } = uScores;
const { isLogged } = useUsers();

useHead({
    title: "Play the detective game, learn Dutch while solving cases!",
});

const text = ref<Phrases>(route1);
const correctSentences = ref<number>(0);
const success = ref<boolean>(false);
const pastScore = ref<number>(0);
const hasPastScore = ref<boolean>(false);
const isSaved = ref<boolean>(false);
const stepper = ref<number>(0);
const firstAnswer = ref<number>(-1);
const disableTranslations = ref<boolean>(false);

function nextStep() {
    if (stepper.value === 3) {
        success.value = true;
        completed();
    } else {
        stepper.value++;
        firstAnswer.value = -1; //resetting the answers
    }
}

async function completed() {
    if (isLogged()) {
        await getScoreByGameAndCurrentUser("games/detective");
        if (scores.value.length > 0) {
            pastScore.value = Number(scores.value[0].score);
            hasPastScore.value = true;
        } else {
            hasPastScore.value = false;
        }
    }
}

function returnPhrase() {
    return route1[stepper.value];
}

function tryAgain() {
    window.location.reload(); // find a better way to reset the state
}

function checkSelection(answer: string) {
    if (returnPhrase().solution === answer) {
        firstAnswer.value = 1;
        correctSentences.value++;
    } else {
        firstAnswer.value = 0;
    }
}

function triggerTranslations() {
    const actualTranslations = disableTranslations.value;
    disableTranslations.value = !actualTranslations;
}


function checkIfScoreIsBetter() {
    if (
        isLogged() &&
        (hasPastScore.value ? correctSentences.value > pastScore.value : true) &&
        !isSaved.value
    ) {
        return true;
    }
    return false;
}

function saveScore() {
    if (!isLogged()) return;

    const updateOrInsert = hasPastScore.value ? scores.value[0].id : false;

    uScores.saveScore("games/detective", correctSentences.value, updateOrInsert);
    //TODO: manage error response
    isSaved.value = true;
}

</script>
