<template>
    <div>
        <Container>
            <div class="my-2">
                <h2 class="font-bold text-sm">
                    Hallo
                    {{
                        $store.state.user.userInfo
                            .user_metadata.full_name
                    }},
                </h2>
                <p class="text-sm">
                    You can start a new lesson, play a game,
                    or read the blog!
                </p>
            </div>
        </Container>
        <DashboardTabs
            :selectedTab="tabSelection"
            :changeTab="changeTab"
        />
        <CoursesList />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardTabs from './DashboardTabs.vue'
export enum TAB_SELECTION {
    LEARN = 'learn',
    PLAY = 'play',
    READ = 'read',
}

export default defineComponent({
    data() {
        return {
            tabSelection: TAB_SELECTION.LEARN,
        }
    },
    methods: {
        changeTab(value: TAB_SELECTION): void {
            this.tabSelection = value
        },
    },
    components: { DashboardTabs },
})
</script>
