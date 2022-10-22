<template>
    <div v-if="loadStatus === 'loading'">
        <div
            class="flex w-full flex-1 justify-center items-center"
        >
            <UISpinner />
        </div>
    </div>
    <div v-else-if="loadStatus === 'error'">error</div>
    <div v-else-if="loadStatus === 'success'"></div>
    <div v-else>Not A/B/C</div>
</template>
<script>
import { mapState } from 'vuex'

//https://vuejs.org/guide/essentials/list.html#v-for

export default {
    mounted() {
        this.$store.dispatch('courses/getCourses')
    },
    computed: mapState({
        loadStatus: (state) => state.courses.request,
        coursesList: (state) => state.courses.courses,
    }),
}
</script>
