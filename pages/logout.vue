<template>
    <Container>
        <UIBlogWrapper>
            <UITitle orange="Doei" blue="Doei" center />
            <section
                class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto"
            >
                <p class="text-center">
                    You logged out successfuly from Dutch
                    for Developers 👋
                </p>
                <p class="text-center">
                    <small
                        >You gonna be redirected to the home
                        page in {{ seconds }} seconds</small
                    >
                </p>
            </section>
        </UIBlogWrapper>
    </Container>
</template>
<script>
import 'vue-awesome/icons/brands/linkedin'
import 'vue-awesome/icons/brands/github'
import Icon from 'vue-awesome/components/Icon'

export default {
    name: 'Login',
    components: {
        'v-icon': Icon,
    },
    data() {
        return {
            seconds: 10,
        }
    },
    created() {
        this.counter = setInterval(() => {
            if (this.seconds > 0) {
                this.aSecondLess()
            } else {
                console.log('finished')
                clearInterval(this.counter)
                this.$router.replace('/')
            }
        }, 1000)
    },

    methods: {
        aSecondLess() {
            this.seconds--
        },
    },
    beforeUnmount() {
        clearInterval(this.counter)
    },
}
</script>
