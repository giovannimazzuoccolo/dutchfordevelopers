<template>
    <div>
        <UITitle orange="Course" blue="Content" center />
        <div class="flex justify-center min-w-96">
            <ul class="my-4 w-full md:max-w-4xl">
                <li v-for="item in courses" :key="item.id">
                    <UIAccordion :title="item.title" :text="item.description" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCoursesStore } from '~/store/courses';

export default defineComponent({
    setup() {
        const coursesStore = useCoursesStore();
        const { courses } = storeToRefs(coursesStore);
        onMounted(() => {
            coursesStore.getCourses();
        });
        return {
            courses,
        };
    },
});
</script>
