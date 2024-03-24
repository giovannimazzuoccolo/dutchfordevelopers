<template>
    <SharedContainer>
        <UITitle v-if="error.statusCode === 404" orange="Not found" blue="Page" />    
	<UITitle v-else blue="Faut" orange="error"/>
        <NuxtLink to="/">Home page</NuxtLink>
    </SharedContainer>
</template>

<script>
export default {
    props: ['error'],
}
</script>
