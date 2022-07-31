<template>
    <Dashboard />
</template>

<script lang="ts">
import Vue from 'vue'
import Dashboard from '~/components/Dashboard/Dashboard.vue'

export default Vue.extend({
    name: 'IndexPage',
    components: { Dashboard },
    created: async function () {
        console.log('hjello')

        const res = await this.$store.dispatch(
            'user/autoAuthenticate'
        )
        console.log(res)
    },
})
</script>
