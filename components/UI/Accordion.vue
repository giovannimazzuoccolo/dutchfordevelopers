<template>
    <details
        class="p-4 bg-gray-100 m-2 cursor-pointer rounded-sm"
    >
        <summary>{{ title }}</summary>
        <p>
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
