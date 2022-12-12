<template>
    <div>
        <Container>
            <div class="my-2">
                <h2
                    class="font-bold text-sm dark:text-white"
                >
                    Hallo
                    {{
                        $store.state.user.userInfo
                            .user_metadata.full_name
                    }},
                </h2>
                <p class="text-sm dark:text-white">
                    You can start a new lesson, play a game,
                    or read the blog!
                </p>
            </div>
        </Container>
        <DashboardTabs
            :selectedTab="tabSelection"
            :changeTab="changeTab"
        />
        <CoursesList v-if="isLearn" />
        <GamesList v-if="isGame" />
        <ReadList v-if="isRead" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardTabs from './DashboardTabs.vue'
export enum TAB_SELECTION {
    LEARN = 'learn',
    PLAY = 'play',
    READ = 'read',
    LISTEN = 'listen',
}

export default defineComponent({
    data() {
        return {
            tabSelection: TAB_SELECTION.LEARN,
        }
    },
    computed: {
        isLearn() {
            return this.tabSelection === TAB_SELECTION.LEARN
        },
        isGame() {
            return this.tabSelection === TAB_SELECTION.PLAY
        },
        isRead() {
            return this.tabSelection === TAB_SELECTION.READ
        },
    },
    methods: {
        changeTab(value: TAB_SELECTION): void {
            this.tabSelection = value
        },
    },
    components: { DashboardTabs },
})
</script>
