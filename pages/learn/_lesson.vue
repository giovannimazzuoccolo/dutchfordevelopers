<template v-if="isLogged()">
    <div v-if="loadStatus === REQUEST_STATUS.SUCCESS">
        <article
            class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
        >
            <nuxt-content
                :document="page"
                class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words"
            />
            <UILessonInfo />
        </article>
        <Container>
            <div class="my-4" v-if="!course[0].isRead">
                <UIButton @click="markCourse"
                    >Mark this lesson as read</UIButton
                >
            </div>
        </Container>
    </div>
    <div
        v-else
        class="flex justify-center items-center w-screen h-80"
    >
        <UISpinner />
    </div>
</template>
<template v-else>
    <article
        class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
    >
        <nuxt-content
            :document="page"
            class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words"
        />
        <UILessonInfo />
    </article>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { REQUEST_STATUS } from '~/enums'

export default Vue.extend({
    data() {
        return {
            page: null,
            REQUEST_STATUS,
        }
    },
    computed: mapState({
        loadStatus: (state: any) => state.courses.request,
        course: (state: any) => state.courses.courses,
    }),
    async asyncData({ $content, params, store }) {
        const { lesson } = params
        if (store.getters['user/isLogged']) {
            store.dispatch('courses/getCourse', {
                courseName: lesson,
            })
        }

        const page = await $content(lesson).fetch()
        return { page }
    },
    methods: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        markCourse() {
            this.$store.dispatch(
                'courses/markCourseAsRead',
                { courseId: this.course[0].id }
            )
        },
    },
})
</script>
