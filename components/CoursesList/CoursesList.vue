<template>
  <!--  <div v-if="loadStatus() === 'loading'">Loading</div>
    <div v-else-if="loadStatus() === 'error'">error</div>
    <div v-else-if="loadStatus() === 'success'">C</div>
    <div v-else>Not A/B/C</div>-->
    <p>my text --- {{loadStatus}}</p>
</template>
<script>
import { mapState } from 'vuex'

export default { 
  mounted() {
      this.$store.dispatch('courses/getCourses');
    },
    computed: mapState({ 
      loadStatus: state=> state.courses.request,
      coursesList: state=> state.courses.courses
    }),
    }
</script>
