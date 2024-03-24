<template>
  <div
      class="opacity-0 duration-700 ease-in-out transition-opacity text-2xl dark:text-white"
      :class="{
            'opacity-0': !isVisible,
            'opacity-100': isVisible,
        }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  delay: {
    required: true,
    type: Number
  }
});

const isVisible = ref(true);
const interval = ref(0);

function counterFunc(): number {
  return window.setInterval(() => {
    isVisible.value = true
  }, props.delay * 700)
};

onMounted(() => {
  interval.value = counterFunc()
})

</script>
