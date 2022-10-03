<template>
    <div
        class="sticky top-0 backdrop-saturate-200 blur bg-main-header"
    >
        <Container>
            <header
                class="flex justify-between w-full items-center"
            >
                <Logo />
                <MainNavigation
                    onClickMobileMenu
                    isMenuOpen="menuOpen"
                />
            </header>
        </Container>
    </div>
</template>
<script>
export default {
    name: 'Header',
    data() {
        return {
            menuOpen: false,
        }
    },
    methods: {
        openMenu() {
            console.log('openmenu')
            this.menuOpen = !this.menuOpen
        },
    },
}
</script>
