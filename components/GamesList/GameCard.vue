<template>
    <div
        class="rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none p-2 cursor-pointer hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-600"
        role="link"
        @click="navigate"
    >
        <div class="flex items-center w-full">
            <div class="p-6">
                <font-awesome-icon :name=`fa-${icon}` class="fill-slate-500 scale-150" />
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
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
//TODO: see if it is possible to import those icons dynamically


export default Vue.extend({
  components: {FontAwesomeIcon},

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
