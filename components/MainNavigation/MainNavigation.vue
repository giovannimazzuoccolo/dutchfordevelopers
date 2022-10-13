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
                    : ' absolute top-14 left-0 z-10 bg-gray-100 bg-opacity-90 w-full text-center flex flex-col gap-2 py-4 blur-xl'
            "
            @click="closeMenu"
        >
            <MainNavigationItem
                v-if="!isLogged"
                class="hover:underline"
            >
                <NuxtLink to="/discover">Discover</NuxtLink>
            </MainNavigationItem>
            <MainNavigationItem v-else>
                <NuxtLink to="/dashboard">Learn</NuxtLink>
            </MainNavigationItem>
            <MainNavigationItem
                ><NuxtLink to="/about"
                    >About</NuxtLink
                ></MainNavigationItem
            >
            <MainNavigationItem>
                <NuxtLink to="/contacts">Contacts</NuxtLink>
            </MainNavigationItem>
            <MainNavigationItem v-if="!isLogged">
                <NuxtLink to="/login">Join now</NuxtLink>
            </MainNavigationItem>
            <MainNavigationItem
                v-else
                @click="$store.dispatch('user/signOut')"
            >
                Logout
            </MainNavigationItem>
        </ul>
    </nav>
</template>
<script>
export default {
    name: 'MainNavigation',
    data() {
        return {
            menuOpen: false,
        }
    },
    methods: {
        openMenu() {
            this.menuOpen = true
        },
        closeMenu() {
            this.menuOpen = false
        },
    },
    computed: {
        isLogged() {
            console.log(
                this.$store.getters['user/isLogged']
            )
            return this.$store.getters['user/isLogged']
        },
    },
}
</script>
