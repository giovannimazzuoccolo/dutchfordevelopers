<template>
  <nav>
    <ul class="flex uppercase gap-4">
      <li>Learn</li>
      <li>About</li>
      <li>Contacts</li> 
      <li @click="$store.dispatch('authenticate')" class="text-main-orange">Join now</li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'MainNavigation'
  }
</script>
