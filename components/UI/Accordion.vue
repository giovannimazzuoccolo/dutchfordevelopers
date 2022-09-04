<template>
    <details
        class="bg-gray-50 my-2 cursor-pointer rounded-sm w-full border min-w-full"
    >
        <summary class="text-lg mb-2 p-4">
            {{ title }}
        </summary>
        <p class="p-4 bg-white">
            {{ text }}
        </p>
    </details>
</template>
<script>
export default {
    props: {
        text: String,
        title: String,
    },
}
</script>
