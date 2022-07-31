<template>
    <nav>
        <svg viewBox="0 0 100 80" width="32" height="32">
            <rect
                width="100"
                height="20"
                fill="#121054"
            ></rect>
            <rect
                y="30"
                width="100"
                height="20"
                fill="#121054"
            ></rect>
            <rect
                y="60"
                width="100"
                height="20"
                fill="#121054"
            ></rect>
        </svg>
        <ul class="hidden md:flex uppercase gap-4">
            <li>Learn</li>
            <li>About</li>
            <li>Contacts</li>
            <li
                @click="$store.dispatch('authenticate')"
                class="text-main-orange"
            >
                Join now
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: 'MainNavigation',
}
</script>
