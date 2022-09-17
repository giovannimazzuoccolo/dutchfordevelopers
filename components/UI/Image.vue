<template>
    <img
        :src="src"
        :alt="alt"
        :class="[
            rounded && 'rounded-md',
            extraspacing && 'my-6',
        ]"
    />
</template>
<script>
export default {
    props: {
        src: String,
        alt: String,
        rounded: {
            type: Boolean,
            required: false,
        },
        extraspacing: {
            type: Boolean,
            required: false,
        },
    },
}
</script>
