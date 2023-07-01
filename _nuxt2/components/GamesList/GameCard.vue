<template>
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-2 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600"
        role="link"
        @click="navigate"
    >
        <div class="flex items-center w-full">
            <div class="p-6">
                <v-icon :name="icon" class="fill-slate-500 scale-150" />
            </div>
            <div class="w-full">
                <h3 class="uppercase text-xl text-main-orange my-2">
                    {{ name }}
                </h3>

                <p class="dark:text-white mb-2">{{ description }}</p>
                <p class="dark:text-white" v-if="score">
                    Best score
                    <span class="text-main-orange">{{ score }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
//TODO: see if it is possible to import those icons dynamically
import 'vue-awesome/icons/user-secret'
import 'vue-awesome/icons/passport'
import 'vue-awesome/icons/icons'
import 'vue-awesome/icons/reply'
import 'vue-awesome/icons/redo'
import 'vue-awesome/icons/coins'
import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
    components: {
        'v-icon': Icon,
    },
    methods: {
        navigate() {
            this.$router.push(this.route)
        },
    },
    props: {
        name: String,
        description: String,
        route: String,
        icon: String,
        score: {
            type: String,
            required: false,
        },
    },
})
</script>
