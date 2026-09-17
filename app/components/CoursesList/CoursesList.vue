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
        <span v-for="course in courses">
          <CoursesListCard
              :title="course.title"
              :description="course.description"
              :route="course.route"
              :isRead="course.isRead"
          />
        </span>
      </div>
    </div>
  </SharedContainer>
</template>
<script setup lang="ts">

import {useCoursesStore} from "~/store/courses";
import {REQUEST_STATUS} from "~/enums/serverRequests";
import {storeToRefs} from "pinia";

const useCourses = useCoursesStore();
const {courses, request} = storeToRefs(useCourses);

const {data: session} = useAuth();
const userId = computed(() => (session.value as any)?.user?.id as string | undefined);
// Captured here (setup top-level) so SSR cookie forwarding is guaranteed.
const requestFetch = useRequestFetch();

// SSR-friendly initial fetch: runs on the server via useAsyncData so the
// course grid is present in view-source. The joined endpoint resolves the
// session server-side, serving plain courses to anonymous users and
// isRead-enriched courses to logged-in users. The cache key includes the
// user id so logging in/out refetches instead of reusing another user's
// (or anonymous) payload, and hydration reuses the payload without a
// duplicate request.
await useAsyncData(
  () => `courses-list-${userId.value ?? "anon"}`,
  () => useCourses.getCoursesJoined(requestFetch),
);
</script>
