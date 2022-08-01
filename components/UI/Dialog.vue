<template>
    <div v-if="open" class="absolute">
        <div
            class="w-screen h-screen fixed bg-gray-500 top-0 opacity-70"
        ></div>
        <dialog
            class="p-4 shadow-md w-11/12 h-auto m-4 rounded-lg fixed top-4 left-4"
            :open="open"
        >
            <slot></slot>
            <UIButton text="Close" />
            <UIButton text="Save" />
        </dialog>
    </div>
</template>
<script>
export default {
    props: {
        open: Boolean,
    },
}
</script>
