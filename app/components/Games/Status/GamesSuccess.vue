<template>
    <div
        class="flex justify-center items-center absolute top-0 h-full z-10 w-full bg-gray-700/80 backdrop-blur-l flex-col gap-4 round"
    >
        <h2 class="text-3xl md:text-5xl text-bold text-main-orange uppercase text-center">
            🎉 Gefeliciteerd 🎉
        </h2>
        <p class="text-white">
                    You guessed {{ newScore }} {{scoreType}}! Your best score is
                    {{ pastScore }} {{scoreType}}
                </p>
                <div class="flex gap-4">
                    <p v-if="saved" class="text-white py-2 px-4">Saved!</p>
                    <UIButton
                        v-if="isLogged() && newScore > pastScore && !saved"
                        @click="save"
                        >Save
                    </UIButton>
                    <UIButton @click="tryAgain">Try again</UIButton>
                </div>
    </div>
</template>
<script setup lang="ts">
import { useUsers } from '~/store/users';
import { useScores } from "~/store/scores";
import { storeToRefs } from 'pinia';
const uScores = useScores();
const { scores } = storeToRefs(uScores);
const { isLogged } = useUsers();

// add ref saved and pastscore
import { ref } from 'vue';
const saved = ref(false);
const pastScore = ref(0);

const props = defineProps({

    newScore: {
        type: Number,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    scoreType: {
        type: String,
        required: true
    }
})

const save = () => {
    // Implement save logic here
    uScores.saveScore(`games/${props.game}`, props.newScore);

    saved.value = true;
}

onMounted(async () => {
    const score = await uScores.getScoreByGameAndCurrentUser(`games/${props.game}`);
    pastScore.value = typeof score === 'number' ? score : 0;
})

const tryAgain = () => {
    // TODO: reset the game state
    location.reload();
}
</script>
