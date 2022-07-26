<template>
  <p>User is authenticated {{ $store.state.user }}</p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
