<template>
    <button
        @click="click"
        class="py-2 px-4 bg-main-orange text-white rounded font-bold border-2 border-main-orange hover:bg-white hover:text-main-orange transition ease-in-out"
    >
        {{ text }}
    </button>
</template>
<script>
export default {
    props: {
        text: String,
        click: Function,
    },
}
</script>
