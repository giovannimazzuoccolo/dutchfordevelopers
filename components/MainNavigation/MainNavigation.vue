<template>
  <nav v-if="isUserLogged !== 'LOADING'">
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
      <MainNavigationItem v-if="isUserLogged" class="hover:underline">
        <NuxtLink to="/dashboard">Learn</NuxtLink>

      </MainNavigationItem>
      <MainNavigationItem v-else>
        <NuxtLink to="/discover">Discover</NuxtLink>

      </MainNavigationItem>
      <MainNavigationItem>
        <NuxtLink to="/about">About</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem>
        <NuxtLink to="/contacts">Contacts</NuxtLink>
      </MainNavigationItem>
      <MainNavigationItem v-if="isUserLogged">
        <span @click="startLogout"> Logout </span>

      </MainNavigationItem>
      <MainNavigationItem v-else>
        <NuxtLink to="/login">Join now</NuxtLink>

      </MainNavigationItem>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {useUsers} from "~/store/users";

const {logout, isLogged} = useUsers()

const isUserLogged = ref<'LOADING'|"LOGGED"|"NOT_LOGGED">("LOADING")
const menuOpen = ref<boolean>(false)

onMounted(async () => {
  isUserLogged.value = await isLogged() ? "LOGGED" : "NOT_LOGGED"
})

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
