<template>
    <div v-if="isLogged">
        <div v-if="request === REQUEST_STATUS.SUCCESS">
            <article
                class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
            >
                <!-- <ContentDoc
                    class="prose dark:prose-invert prose-sm lg:prose-base xl:prose-xl wrap-break-word"
                /> -->
                <p>data</p>
                <pre v-if="data">
{{ data }}
                </pre>
                <ContentRenderer v-if="data" :value="data" />
                    
                <UILessonInfo />
            </article>
            <SharedContainer>
                <div class="my-4">
                    <UIButton @click="markCourse"
                        >Mark this lesson as read</UIButton
                    >
                </div>
            </SharedContainer>
        </div>
        <div v-else class="flex justify-center items-center w-screen h-80">
            <UISpinner />
        </div>
    </div>

    <div v-else>
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
                        ><router-link to="/dashboard?tab=learn"
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
import { REQUEST_STATUS } from "~/enums/serverRequests";
import { useCoursesStore } from "~/store/courses";
import { useUsers } from "~/store/users";
import { storeToRefs } from "pinia";

const route = useRoute();

const useCourses = useCoursesStore();

console.log('loaded, route params:', route.params.lesson);

const { data } = await useAsyncData(route.path, () => {
    console.log('Fetching lesson content for:', route.params.lesson, data);
    debugger;
    request.value = REQUEST_STATUS.SUCCESS;
  return queryCollection('content').first();
})


const { request } = storeToRefs(useCourses);
const { markCourseAsRead, getCourse } = useCourses;

const { userInfo } = useUsers();

const isLogged = ref(false);
const isRead = ref(false);

async function markCourse() {
    await markCourseAsRead(route.params.lesson as string);
}


onMounted(async () => {
    if (userInfo) {
        await getCourse(route.params.lesson as string);
    }
});
</script>
