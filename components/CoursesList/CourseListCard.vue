<template>
    <div
        class="rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="link"
    >
        <h3>{{ title }}</h3>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
    },
}
</script>
