<template>
    <div v-if="open" class="absolute">
        <div
            class="w-screen h-screen fixed bg-gray-500 top-0 opacity-70"
        ></div>
        <dialog
            class="p-4 shadow-md w-11/12 h-auto m-6 rounded-lg fixed left-4 bottom-4 md:top-4"
            :open="open"
        >
            <h2 class="mt-2 text-xl">{{ title }}</h2>
            <slot></slot>
            <div class="w-full flex justify-end gap-2">
                <UIButton text="Close" click="close" />
                <UIButton
                    v-if="confirm"
                    text="Confirm"
                    click="confirm"
                />
            </div>
        </dialog>
    </div>
</template>
<script>
export default {
    props: {
        open: Boolean,
        onClose: Promise,
        confirm: {
            type: Function,
            required: false,
        },
        title: String,
    },
}
</script>
