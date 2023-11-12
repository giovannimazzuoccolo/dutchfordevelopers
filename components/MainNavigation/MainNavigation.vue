<template>
  <nav>
    <MainNavigationHamburgerMenu
        :openMenu="openMenu"
        :closeMenu="closeMenu"
        :menuOpen="menuOpen"
    />
    <ul
        class="md:flex uppercase gap-4"
        :class="
                !menuOpen
                    ? 'hidden'
                    : ' absolute top-14 left-0 z-10 bg-gray-100 bg-opacity-90 w-full text-center flex flex-col gap-2 py-4 dark:bg-gray-700 backdrop-blur-l'
            "
        @click="closeMenu"
    >
      <MainNavigationItem v-if="!isLogged" class="hover:underline">
        <NuxtLink to="/discover">Discover</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem v-else>
        <NuxtLink to="/dashboard">Learn</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem>
        <NuxtLink to="/about">About</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem>
        <NuxtLink to="/contacts">Contacts</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem v-if="!isLogged()">
        <NuxtLink to="/login">Join now</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem v-else>
        <span @click="startLogout"> Logout </span>
      </MainNavigationItem>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue'
import {useUsers} from "~/store/users";

const {logout, isLogged} = useUsers()

const menuOpen = ref<boolean>(false)


function openMenu() {
  menuOpen.value = true
}

function closeMenu() {
  menuOpen.value = false
}

function startLogout() {
  logout()
}
</script>
