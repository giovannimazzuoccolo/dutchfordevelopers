<template>
  <button
      @click="callback($event)"
      class="py-2 px-4 bg-main-orange text-white rounded font-bold border-2 border-main-orange hover:bg-white hover:text-main-orange transition ease-in-out"
      :class="
            disabled
                ? 'bg-gray-300 border-gray-500 text-black dark:bg-gray-700  dark:border-black'
                : 'bg-main-orange'
        "
  >
    {{ text }}
    <slot/>
  </button>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    text: String,
    disabled: {
      required: false,
      type: Boolean,
    },
  },
  emits: ["click"],
  methods: {
    callback: function (e: MouseEvent) {
      e.stopPropagation()
      !this.disabled && this.$emit('click', e)
    },
  },
})
</script>
