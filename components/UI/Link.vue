<template>
    <a
        :href="href"
        :target="target"
        class="hover:underline"
        :class="dark ? `text-blue-100` : `text-blue-800`"
        ><slot
    /></a>
</template>
<script>
export default {
    props: {
        href: String,
        target: String,
        dark: Boolean,
    },
}
</script>
