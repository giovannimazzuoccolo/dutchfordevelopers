<template>
    <div>
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
})
</script>
