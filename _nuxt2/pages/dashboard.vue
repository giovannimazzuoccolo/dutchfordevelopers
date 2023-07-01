<template>
    <Dashboard :logged="true" />
</template>
<script>
export default {
    middleware: 'restricted',
}
</script>
