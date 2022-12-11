<template>
    <Container>
        <div v-if="loadStatus === 'loading'">
            <div
                class="flex w-full flex-1 justify-center items-center"
            >
                <UISpinner />
            </div>
        </div>
        <div
            v-else-if="loadStatus === 'error'"
            class="dark:text-white"
        >
            <em>Jammer,</em> we are sorry, we are not able
            to retrieve the lessons
        </div>
        <div v-else="loadStatus === 'success'">
            <div
                class="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
                <template v-for="course in coursesList">
                    <CourseListCard
                        :title="course.title"
                        :description="course.description"
                        :route="course.route"
                        :isRead="course.isRead"
                    />
                </template>
            </div>
        </div>
    </Container>
</template>
<script>
import { mapState } from 'vuex'

import Vue from 'vue'
import CourseListCard from './CourseListCard.vue'

export default Vue.extend({
    mounted() {
        this.$store.dispatch('courses/getCoursesForUser')
    },
    computed: mapState({
        loadStatus: (state) => state.courses.request,
        coursesList: (state) => state.courses.courses,
    }),
    components: { CourseListCard },
})
</script>
