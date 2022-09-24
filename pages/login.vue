<template>
    <Container>
        <UIBlogWrapper>
            <UITitle
                orange="Enter in"
                blue="Dutch for Developers"
                center
            />
            <section
                class="flex flex-col gap-5 my-12 justify-center max-w-md mx-auto"
            >
                <UIButton>
                    <span
                        class="flex gap-2 items-center justify-center"
                    >
                        <v-icon
                            name="brands/github"
                            class="fill-current"
                        />
                        Continue with Github</span
                    >
                </UIButton>
                <UIButton>
                    <span
                        class="flex gap-2 items-center justify-center"
                    >
                        <v-icon
                            name="brands/linkedin"
                            class="fill-current"
                        />
                        Continue with Linkedin
                    </span>
                </UIButton>
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
}
</script>
