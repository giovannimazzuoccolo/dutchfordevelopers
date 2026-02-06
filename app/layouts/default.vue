<template>
    <main class="bg-white dark:bg-slate-900 flex flex-col min-h-screen">
        <Header />
        <div class="flex-1 px-4">
            <slot />
        </div>
      <ToastNotification v-if="toastStore.show" :message="toastStore.message" :duration="toastStore.duration" />
        <Footer />
    </main>

</template>
<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";
import ToastNotification from "~/components/UI/Toast.vue";
import { useToastStore } from "~/store/toasts";

const toastStore = useToastStore();
</script>