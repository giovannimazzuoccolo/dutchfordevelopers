<template>
    <div
        class="flex justify-center items-center w-1/3 flex-col gap-4 p-2"
    >
        <slot></slot>
        <p class="text-center">{{ text }}</p>
    </div>
</template>
<script>
export default {
    props: {
        text: String,
    },
}
</script>
