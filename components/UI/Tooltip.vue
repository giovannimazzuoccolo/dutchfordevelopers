<template>
  <div @mouseover="toggleTooltip()" @mouseout="toggleTooltip()">
    <slot></slot>
    <div
        class="absolute z-10 mt-1 text-sm bg-black text-white dark:bg-blue dark:text-white p-2 rounded-md"
        v-if="showTooltip"
    >
      {{ tooltipText }}
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  tooltipText: {
    type: String,
    required: true,
  }
})

const showTooltip = ref(false);

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value
}
</script>
