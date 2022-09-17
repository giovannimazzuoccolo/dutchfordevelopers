<template>
    <div>
        <UITitle orange="Course" blue="Content" center />
        <div class="flex justify-center min-w-96">
            <ul class="my-4 w-full md:max-w-4xl">
                <li v-for="item in courseTopic">
                    <UIAccordion
                        :title="item.title"
                        :text="item.description"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { courseTopic } from '~/content/courseTopics'

export default {
    data() {
        return {
            courseTopic,
        }
    },
}
</script>
