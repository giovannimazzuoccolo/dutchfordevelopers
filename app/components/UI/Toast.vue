<template>
  <Transition
      enter-from-class="opacity-0 translate-y-8"
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-to-class="opacity-0 translate-y-8"
  >
    <div v-if="show" class="fixed z-40 left-2 bottom-32 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <button type="button" @click="closeToast" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>
  </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000,
  },
});

const show = ref(false);

let timeoutId: ReturnType<typeof setTimeout> | null = null;

const startTimer = () => {
  timeoutId = setTimeout(() => {
    show.value = false;
  }, props.duration);
};

const clearTimer = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
};

const closeToast = () => {
  show.value = false;
};

onMounted(() => {
  show.value = true;
  startTimer();
});

onUnmounted(() => {
  clearTimer();
});
</script>