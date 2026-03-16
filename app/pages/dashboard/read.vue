<template>
  <DashboardContainer basePath="/dashboard">
    <ReadList />
  </DashboardContainer>
</template>

<script setup lang="ts">
import DashboardContainer from "~/components/Dashboard/DashboardContainer.vue";

useHead({
  title: "Read - Dashboard - Dutch for Developers",
});
</script>
