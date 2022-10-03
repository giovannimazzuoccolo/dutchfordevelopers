<template>
    <nav>
        <svg
            viewBox="0 0 100 80"
            width="36"
            height="36"
            class="md:hidden relative -top-1 cursor-pointer"
            @click="openMenu"
            role="button"
            v-if="!menuOpen"
        >
            <rect
                width="100"
                height="15"
                fill="#EC8A27"
            ></rect>
            <rect
                y="30"
                width="100"
                height="15"
                fill="#EC8A27"
            ></rect>
            <rect
                y="60"
                width="100"
                height="15"
                fill="#EC8A27"
            ></rect>
        </svg>
        <svg
            class="fill-current h-6 w-6 text-main-orange md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            width="36"
            height="36"
            @click="closeMenu"
            v-else
        >
            <title>Close</title>
            <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
        </svg>
        <ul
            class="md:flex uppercase gap-4"
            :class="
                !menuOpen
                    ? 'hidden'
                    : ' absolute top-14 left-0 z-10 bg-gray-100 bg-opacity-90 w-full text-center flex flex-col gap-2 py-4 blur-xl'
            "
            @click="closeMenu"
        >
            <li v-if="!isLogged" class="hover:underline">
                <NuxtLink to="/discover">Discover</NuxtLink>
            </li>
            <li v-else>
                <NuxtLink to="/dashboard">Learn</NuxtLink>
            </li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li>
                <NuxtLink to="/contacts">Contacts</NuxtLink>
            </li>
            <li v-if="!isLogged">
                <NuxtLink to="/login">Join now</NuxtLink>
            </li>
            <li
                v-else
                @click="$store.dispatch('user/signOut')"
            >
                Logout
            </li>
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
