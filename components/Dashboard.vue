<template>
    <Container>
        <h2 class="font-bold ">Hallo, {{ $store.state.user }},</h2>
        <p>You can start a new lession, play a game, or read the blog!</p>
        <DashbardTabs :selectedTab="tabSelection" :changeTab="changeTab"/>
    </Container>
</template>
<script lang="ts">
import DashbardTabs from "./DashbardTabs.vue";
    enum TAB_SELECTION {
        LEARN =  'learn',
        PLAY = 'play',
        READ = 'read'
    }

    export default {
    data() {
        return {
            tabSelection: TAB_SELECTION.LEARN
        };
    },
    methods: {
        changeTab(value: TAB_SELECTION) {
            this.tabSelection = value;
        }
    },
    components: { DashbardTabs }
}
</script>