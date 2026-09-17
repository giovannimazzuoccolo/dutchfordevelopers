<template>
   
        <div v-if="data">
            <article
                class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
            >
                <div class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl max-w-none">
                    <ContentRenderer :value="data" />
                </div>
                    
                <UILessonInfo />
            </article>
            <SharedContainer>
                <div class="my-4" v-if="isLogged">
                    <UIButton v-if="!isRead" @click="markCourse"
                        >Mark this lesson as read</UIButton
                    >
                    <UIButton v-else @click="unmarkCourse"
                        >Remove from read lessons</UIButton
                    >
                </div>
            </SharedContainer>
        </div>
        <div v-else class="flex justify-center items-center w-screen h-80">
            <UISpinner />
        </div>


    <div v-if="!data && !pending">
        <article
            class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
        >
            <div
                class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl wrap-break-word"
            >
                <p class="py-4 text-xl dark:text-white">
                    Jammer, cannot find the lesson!<br />
                    But you can find other lessons in the
                    <span class="text-main-orange hover:underline"
                        ><router-link to="/dashboard/courses"
                            >dashboard</router-link
                        ></span
                    >
                    page
                </p>
            </div>
            <UILessonInfo />
        </article>
    </div>
</template>

<script setup lang="ts">
import { useCoursesStore } from "~/store/courses";
import { useUsers } from "~/store/users";
import { storeToRefs } from "pinia";

const route = useRoute();

const useCourses = useCoursesStore();
const { markCourseAsRead, unmarkCourseAsRead, getCoursesJoined } = useCourses;

const usersStore = useUsers();
const { userInfo } = storeToRefs(usersStore);

const lesson = route.params.lesson as string;
const lessonPath = route.path;

const { data, pending } = await useAsyncData(route.path, () =>
    queryCollection('learn').where('slug', '=', lesson).first()
);

const isLogged = computed(() => !!userInfo.value);
const userId = computed(() => userInfo.value?.user?.id as string | undefined);
// Captured here (setup top-level) so SSR cookie forwarding is guaranteed.
const requestFetch = useRequestFetch();

// Seed the store with the joined list (includes per-lesson isRead flags)
// so the toggle below renders the correct label during SSR. The key is
// per-user so login/logout refetches instead of reusing stale payloads.
await useAsyncData(
    () => `lesson-read-${lesson}-${userId.value ?? "anon"}`,
    async () => {
        if (!userId.value) return [];
        const known = useCourses.courses.find((c) => c.route === lessonPath);
        if (known?.isRead !== undefined) return useCourses.courses;
        return await getCoursesJoined(requestFetch);
    },
);

// Derived from the store so mark/unmark reflect immediately via the
// optimistic updates in the store actions. On failure the flag is left
// untouched, so the button stays and the learner can retry.
const isRead = computed(
    () => useCourses.courses.find((c) => c.route === lessonPath)?.isRead ?? false,
);

async function markCourse() {
    // Send the canonical course route (/learn/<slug>); the API looks courses
    // up by route, so the bare slug alone would 404.
    await markCourseAsRead(lessonPath);
}

async function unmarkCourse() {
    await unmarkCourseAsRead(lessonPath);
}
</script>