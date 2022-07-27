<template>
<div>
<p>{{ selectedTab }}</p>
<ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
  role="tablist">
  <li class="nav-item" role="presentation">
    <a href="#" class="
     nav-link
      block
      font-medium
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-learn-tab"
    @click="changeTab('LEARN')"
    >Learn</a>
  </li>
  <li class="nav-item" role="presentation">
    <a href="#" class="
      nav-link
      block
      font-medium
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent"
      @click="changeTab('PLAY')"
     id="tabs-play-tab"  role="tab"
      >Play</a>
  </li>
  <li class="nav-item" role="presentation">
     <a href="#" class="
      nav-link
      block
      font-medium
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent"
      @click="changeTab('READ')"
    id="tabs-profile-tab"  role="tab"
      >Read</a>
  </li>
 
</ul>
</div>
</template>
<script lang="ts">
  export default {
    props: {
      selectedTab: String,
      changeTab: Function
    },
  name: 'DashboardTabs'
  }
</script>