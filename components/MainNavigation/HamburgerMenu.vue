<template>
    <div class="w-9 h-9 flex justify-center md:hidden">
        <svg
            viewBox="0 0 100 80"
            width="36"
            height="36"
            class="relative -top-1 cursor-pointer"
            @click="openMenu()"
            role="button"
            v-if="!menuOpen"
        >
            <title>Open</title>
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
            class="fill-current w-7 h-7 text-main-orange md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 121.31 122.876"
            width="36"
            height="36"
            @click="closeMenu()"
            v-else
        >
            <title>Close</title>
            <g>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
                ></path>
            </g>
        </svg>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HamburgerMenu',
    props: {
        openMenu: {
            type: Function,
            required: true,
        },
        closeMenu: {
            type: Function,
            required: true,
        },
        menuOpen: Boolean,
    },
})
</script>
