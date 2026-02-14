<template>
  <button
    :class="[baseClass, colorClass]"
    type="button"
    @click="emit('click')"
  >
    <span class="flex items-center justify-center gap-2">
      <Icon :name="icon" class="h-6 w-6" />
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
type Props = {
  label: string;
  icon: string;
  colorClass: string;
};

defineProps<Props>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const baseClass =
  "w-full py-2 rounded-lg font-bold border-2 px-20 md:px-28 cursor-pointer text-center";
</script>
