<template>
    <Container>
        <UIBlogWrapper>
            <UITitle orange="Doei" blue="Doei" center />
            <section
                class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto"
            >
                <p class="text-center">
                    You logged out successfully from Dutch
                    for Developers 👋
                </p>
                <p class="text-center">
                    <small
                        >You are being redirected to the
                        home page in
                        {{ seconds }} seconds</small
                    >
                </p>
            </section>
        </UIBlogWrapper>
    </Container>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Logout',
    data() {
        return {
            seconds: 10,
            counter: 0,
        }
    },
    methods: {
        aSecondLess(): void {
            this.seconds--
        },

        counterFunc(): number {
            return window.setInterval(() => {
                if (this.seconds > 0) {
                    this.aSecondLess()
                } else {
                    clearInterval(this.counter)
                    this.$router.replace('/')
                }
            }, 1000)
        },
    },

    created() {
        this.counter = this.counterFunc()
    },
    beforeDestroy() {
        clearInterval(this.counter)
    },
})
</script>
