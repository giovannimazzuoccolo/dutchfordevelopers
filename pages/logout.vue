<template>
    <Container>
        <UIBlogWrapper>
            <UITitle orange="Doei" blue="Doei" center />
            <section class="flex flex-col gap-3 my-12 justify-center max-w-md mx-auto dark:text-white">
                <p class="text-center">You logged out successfully from Dutch for Developers 👋</p>
                <p class="text-center">
                    <small>You are being redirected to the home page in {{ seconds }} seconds</small>
                </p>
            </section>
        </UIBlogWrapper>
    </Container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'


        const seconds = ref(10)
        let counter: NodeJS.Timer | null = null

        const aSecondLess = () => {
            seconds.value--
        }

        const counterFunc = () => {
            return setInterval(() => {
                if (seconds.value > 0) {
                    aSecondLess()
                } else {
                    clearInterval(counter!)
                    router.replace('/')
                }
            }, 1000)
        }

        const router = useRouter()

        onMounted(() => {
            counter = counterFunc()
        })

        onBeforeUnmount(() => {
            clearInterval(counter!)
        })


</script>
