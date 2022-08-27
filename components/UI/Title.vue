<template>
    <h2
        class="uppercase font-bold text-3xl md:text-5xl text-main-blue w-full text-center my-2"
    >
        <span class="text-main-orange">{{ orange }}</span>
        {{ blue }}
    </h2>
</template>
<script>
export default {
    props: {
        orange: String,
        blue: String,
    },
}
</script>
