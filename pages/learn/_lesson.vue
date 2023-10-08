<template>
  <div v-if="isLogged">
    <div v-if="loadStatus === REQUEST_STATUS.SUCCESS">
      <article
          class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
      >
        <ContentDoc
            class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words"
        />
        <UILessonInfo/>
      </article>
      <Container>
        <div class="my-4" v-if="isRead">
          <UIButton @click="markCourse">Mark this lesson as read</UIButton>
        </div>
      </Container>
    </div>
    <div v-else class="flex justify-center items-center w-screen h-80">
      <UISpinner/>
    </div>
  </div>

  <div v-else>
    <article class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full">
      <ContentDoc
          class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words"
      />
      <UILessonInfo/>
    </article>
  </div>
</template>
<script setup lang="ts">
import Vue from 'vue'
import {REQUEST_STATUS} from "~/enums/serverRequests";
import {useCoursesStore} from "~/store/courses";
import {useUsers} from "~/store/users";

const route = useRoute()

const loadStatus = ref(REQUEST_STATUS.LOADING)
const {markCourseAsRead} = useCoursesStore();
const {userInfo} = useUsers()

const isLogged = ref(false);
const isRead = ref(false);

async function markCourse() {
  markCourseAsRead('1');
}


// const {  } = useAsyncData({ })
const {data} = await useAsyncData('get-document', () => queryContent(
    route.path
).findOne())
// export default Vue.extend({
//   data() {
//     return {
//       page: null,
//       REQUEST_STATUS,
//     }
//   },
//   computed: {
//     isLogged() {
//       return this.$store.getters['user/isLogged']
//     },
//     isRead(): Boolean {
//       console.log('course', this.course[0])
//       if (this.course && !this.course[0]?.isRead) {
//         return true
//       } else {
//         return false
//       }
//     },
//     ...mapState({
//       loadStatus: (state: any) => state.courses.request,
//       course: (state: any) => state.courses.courses,
//     }),
//   },
//   async asyncData({ $content, params, store }) {
//     const { lesson } = params
//     if (store.getters['user/isLogged']) {
//       console.log('l', lesson)
//       store.dispatch('courses/getCourse', {
//         courseName: lesson,
//       })
//     }
//
//     const page = await $content(lesson).fetch()
//     return { page }
//   },
//   methods: {
//     markCourse() {
//       this.$store.dispatch('courses/markCourseAsRead', { courseId: this.course[0].id })
//       this.$router.push('/dashboard')
//     },
//   },
// })
</script>
