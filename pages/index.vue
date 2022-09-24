<template>
    <div>
        <UIDialog
            title="Enter"
            :open="this.$store.state.login.isDialogOpen"
        >
            Enter in Dutch for developers
        </UIDialog>
        <Container>
            <LandingHero />
            <LandingApproach />
            <LandingLessionList />
        </Container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'

Vue.component('v-icon', Icon)

export default Vue.extend({
    name: 'IndexPage',
    created: async function () {
        const res = await this.$store.dispatch(
            'user/autoAuthenticate'
        )
        console.log(res)
    },
})
</script>
