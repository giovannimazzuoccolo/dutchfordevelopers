<template>
  <div v-if="isLogged">
    <div v-if="request === REQUEST_STATUS.SUCCESS">
      <article
          class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
      >
        <ContentDoc
            class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl break-words"
        />
        <UILessonInfo/>
      </article>
      <SharedContainer>
        <div class="my-4">
          <UIButton @click="markCourse">Mark this lesson as read</UIButton>
        </div>
      </SharedContainer>
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
import {storeToRefs} from "pinia";

const route = useRoute()

const useCourses = useCoursesStore();

const {courses, request} = storeToRefs(useCourses);
const {markCourseAsRead, getCourse} = useCourses;

const {userInfo} = useUsers()

const isLogged = ref(false);
const isRead = ref(false);

async function markCourse() {
  await markCourseAsRead(route.params.lesson as string);
}

const props = defineProps();

// const {  } = useAsyncData({ })
const {data} = await useAsyncData('get-document', () => queryContent(
    `learn/${route.params.lesson}`
).findOne())
console.log('d', data
);

onMounted(async () => {
  if (userInfo) {
    const c = await getCourse(route.params.lesson as string)
    console.log('c', c);
  }
});

</script>
