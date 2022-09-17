<template>
    <nav>
        <svg
            viewBox="0 0 100 80"
            width="36"
            height="36"
            class="md:hidden relative -top-1"
        >
            <rect
                width="100"
                height="20"
                fill="#EC8A27"
            ></rect>
            <rect
                y="30"
                width="100"
                height="20"
                fill="#EC8A27"
            ></rect>
            <rect
                y="60"
                width="100"
                height="20"
                fill="#EC8A27"
            ></rect>
        </svg>
        <ul class="hidden md:flex uppercase gap-4">
            <li>Learn</li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li>
                <NuxtLink to="/contacts">Contacts</NuxtLink>
            </li>
            <li
                @click="
                    $store.dispatch('login/openLoginDialog')
                "
            >
                Join now
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
            this.menuOpen = !this.menuOpen
        },
    },
}
</script>
