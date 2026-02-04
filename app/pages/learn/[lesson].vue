<template>
   
        <div v-if="data">
            <article
                class="container mx-auto px-3 py-2 md:px-2 md:py-2 flex justify-between w-full"
            >
                <ContentRenderer :value="data" />
                    
                <UILessonInfo />
            </article>
            <SharedContainer>
                <div class="my-4" v-if="!isLogged && courseReadResult">
                    <UIButton @click="markCourse"
                        >Mark this lesson as read</UIButton
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
import { useCoursesStore } from "~/store/courses";
import { useUsers } from "~/store/users";
import { storeToRefs } from "pinia";

const route = useRoute();

const useCourses = useCoursesStore();
const { markCourseAsRead, getCourse } = useCourses;

const { request: courseReadResult } = storeToRefs(useCourses);

const { userInfo } = useUsers();

const lesson = route.params.lesson as string;

const { data, pending } = await useAsyncData(route.path, () => 
    queryCollection('learn').where('slug', '=', lesson).first()
);

const isLogged = computed(() => !!userInfo);

async function markCourse() {
    await markCourseAsRead(route.params.lesson as string);
}

onMounted(async () => {
    if (userInfo) {
        await getCourse(route.params.lesson as string);
    }
});
</script>