<template>
  <!--  <div v-if="loadStatus() === 'loading'">Loading</div>
    <div v-else-if="loadStatus() === 'error'">error</div>
    <div v-else-if="loadStatus() === 'success'">C</div>
    <div v-else>Not A/B/C</div>-->
    <p>my text --- {{loadStatus}}</p>
</template>
<script lang="ts">
export default {
    mounted() {
      console.log(this.$store);
      this.$store.dispatch('courses/getCourses');
    },
    computed: {
      loadStatus() { this.loadStatus = this.$store.getters['courses/request'] },
      coursesData() { this.coursesData = this.$store.getters['courses/courses'] }
    },
    data() {
      return {
        loadStatus: 'idle',
        coursesData: []
      }
    }
}
</script>
