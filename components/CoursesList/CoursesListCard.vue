<template>
  <div
    class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-4 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600"
    role="link"
    @click="navigate"
  >
    <div class="flex justify-between items-center w-full">
      <h3 class="uppercase text-xl text-main-orange my-2">
        {{ title }}
      </h3>
      <font-awesome-icon
        v-if="isRead"
        icon="check-circle"
        class="fill-current fill-main-orange"
      />
    </div>
    <p class="dark:text-white">{{ description }}</p>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const router = useRouter();

const props = defineProps({
  title: String,
  description: String,
  route: {
    required: true,
    type: String
  },
  isRead: {
    required: false,
    type: Boolean,
  },
});

function navigate() {
  //this can be also wrapped into a <NuxtLink>
  router.push(props.route);
}
</script>
