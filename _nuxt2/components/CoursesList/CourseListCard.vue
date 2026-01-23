<template>
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-4 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600"
        role="link"
        @click="navigate"
    >
        <div class="flex justify-between items-center w-full">
            <h3 class="uppercase text-xl text-main-orange my-2">
                {{ title }}
            </h3>
            <v-icon v-if="isRead" name="check-circle" class="fill-current fill-main-orange" />
        </div>
        <p class="dark:text-white">{{ description }}</p>
    </div>
</template>
<script lang="ts">
import 'vue-awesome/icons/check-circle'
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
    components: {
        'v-icon': Icon,
    },
    props: {
        title: String,
        description: String,
        route: String,
        isRead: {
            required: false,
            type: Boolean,
        },
    },
    methods: {
        navigate() {
            this.$router.push(this.route)
        },
    },
})
</script>
