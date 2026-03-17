<template>
  <DashboardContainer basePath="/dashboard">
    <CoursesList />
  </DashboardContainer>
</template>

<script setup lang="ts">
import DashboardContainer from "~/components/Dashboard/DashboardContainer.vue";

useHead({
  title: "Courses - Dashboard - Dutch for Developers",
});
</script>
