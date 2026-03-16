<template>
  <DashboardContainer basePath="/dashboard">
    <GamesList />
  </DashboardContainer>
</template>

<script setup lang="ts">
import DashboardContainer from "~/components/Dashboard/DashboardContainer.vue";

useHead({
  title: "Games - Dashboard - Dutch for Developers",
});
</script>
