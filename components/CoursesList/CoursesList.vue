<template>
    <div v-if="loadStatus === 'loading'">
        <div
            class="flex w-full flex-1 justify-center items-center"
        >
            <UISpinner />
        </div>
    </div>
    <div v-else-if="loadStatus === 'error'">
        <em>Jammer,</em> we are sorry, we are not able to
        retrieve the lessons
    </div>
    <div v-else="loadStatus === 'success'">
        <Container>
            <div class="grid grid-cols-3 gap-4">
                <template v-for="course in coursesList">
                    <CourseListCard
                        :title="course.title"
                        :description="course.description"
                    />
                </template>
            </div>
        </Container>
    </div>
</template>
<script>
import { mapState } from 'vuex'

//https://vuejs.org/guide/essentials/list.html#v-for

import Vue from 'vue'
import CourseListCard from './CourseListCard.vue'

export default Vue.extend({
    mounted() {
        this.$store.dispatch('courses/getCourses')
    },
    computed: mapState({
        loadStatus: (state) => state.courses.request,
        coursesList: (state) => state.courses.courses,
    }),
    components: { CourseListCard },
})
</script>
