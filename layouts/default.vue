<template>
    <main class="bg-white dark:bg-slate-900 flex flex-col min-h-screen">
        <Header />
        <div class="flex-1 px-4">
            <slot />
        </div>
        <Footer />
    </main>
</template>
<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";

</script>