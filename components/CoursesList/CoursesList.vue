<template>
  <SharedContainer>
    <div v-if="request === REQUEST_STATUS.LOADING">
      <div class="flex w-full flex-1 justify-center items-center">
        <UISpinner/>
        <p>Spinning around</p>
      </div>
    </div>
    <div v-else-if="request === REQUEST_STATUS.ERROR" class="dark:text-white">
      <em>Jammer,</em> we are sorry, we are not able to retrieve the lessons
    </div>
    <div v-else>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
        <template v-for="course in courses">
          <CoursesListCard
              :title="course.title"
              :description="course.description"
              :route="course.route"
              :isRead="course.isRead"
          />
        </template>
      </div>
    </div>
  </SharedContainer>
</template>
<script setup lang="ts">

import {useCoursesStore} from "~/store/courses";
import {REQUEST_STATUS} from "~/enums/serverRequests";
import {useUsers} from "~/store/users";
import {storeToRefs} from "pinia";

const {userInfo} = useUsers()
const useCourses = useCoursesStore();
const {getCourses, getCoursesJoined} = useCourses;
const {courses, request} = storeToRefs(useCourses);


onMounted(() => {
  if (userInfo) {
    getCoursesJoined()
  } else {
    getCourses()
  }
});
</script>
